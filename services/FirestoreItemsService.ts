import Item from "../models/item"

export async function fetchItems() {
    const response = await fetch(`${process.env.DB_API_URL}projects/${process.env.PROJECT_ID}/databases/(default)/documents/items`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = <FirestoreReponse>await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(responseData));
    }

    const itemList: Record<string, Item> = {};

    parseResponse(responseData).documents.forEach((item: any) =>
        itemList[item.name] = new Item(item.name, item.fields.name, +item.fields.value, item.fields.image, item.fields.description)
    );

    return itemList;
}

export async function setItem(token: string, item: { id?: string; name: string; value: number; image: string; description?: string; }) {
    const response = await fetch(`${process.env.DB_API_URL}${item.id ? `${item.id}` : `projects/${process.env.PROJECT_ID}/databases/(default)/documents/items`}`, {
        method: item.id ? 'PATCH' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fields: parseRequest(item) })
    });

    const responseData = <FirestoreDocument>await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(responseData));
    }

    return new Item(item.id ?? responseData.name, item.name, item.value, item.image, item.description)
}

export async function deleteItem(token: string, itemId: string) {
    const response = await fetch(`${process.env.DB_API_URL}${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(JSON.stringify(await response.json()));
    }

    return itemId;
}

function parseResponse(response: any): any {
    const fieldValueNames = ['doubleValue', 'integerValue', 'arrayValue', 'mapValue', 'geoPointValue', 'timestampValue', 'referenceValue', 'bytesValue', 'booleanValue', 'nullValue', 'stringValue'];
    const prop = Object.keys(response).find(value => fieldValueNames.indexOf(value) >= 0);

    switch (prop) {
        case fieldValueNames[0]:
        case fieldValueNames[1]:
            return Number(response[prop]);
        case fieldValueNames[2]:
            return (response[prop].hasOwnProperty('values') && response[prop].values || []).map((value: any) => parseResponse(value));
        case fieldValueNames[3]:
            return parseResponse(response[prop].hasOwnProperty('fields') && response[prop].fields || {});
        case fieldValueNames[4]:
            return { latitude: 0, longitude: 0, ...response[prop] };
        case fieldValueNames[5]:
            return new Date(response[prop]);
        case undefined:
            break;
        default:
            return response[prop];
    }

    if (typeof response === 'object') {
        Object.keys(response).forEach(key => response[key] = parseResponse(response[key]))
    }

    return response;
}

function parseRequest(values: Record<string, any>) {
    const newValue: Record<string, any> = {};
    Object.entries(values).forEach(([key, value]) => {
        switch (typeof value) {
            case 'string':
                if (value.startsWith('projects/')) {
                    return newValue[key] = { referenceValue: value };
                }
                return newValue[key] = { stringValue: value };
            case 'number':
                return newValue[key] = { doubleValue: +value };
            case 'boolean':
                return newValue[key] = { booleanValue: value };
            case 'object':
                if (value === null) {
                    return newValue[key] = { nullValue: value };
                }
                if (value instanceof Date) {
                    return newValue[key] = { timestampValue: value.toISOString() };
                }
                if (Array.isArray(value)) {
                    return newValue[key] = { arrayValue: { values: value.map(arrayValue => parseRequest(arrayValue)) } };
                }
                if (value.hasOwnProperty('latitude') || value.hasOwnProperty('longitude')) {
                    return newValue[key] = { geoPointValue: { latitude: 0, longitude: 0, ...value } };
                }
                return newValue[key] = { mapValue: { fields: parseRequest(value) } };
            default:
                break;
        }
    });

    return newValue;
}