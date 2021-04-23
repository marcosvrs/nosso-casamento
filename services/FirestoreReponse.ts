interface FirestoreReponse {
    documents: FirestoreDocument[]
}

interface FirestoreDocument {
    name: string;
    fields: Record<string, FirestoreValue>;
    createTime: string;
    updateTime: string;
}

interface FirestoreValue {
    stringValue?: string;
    timestampValue?: string;
    doubleValue?: number;
    nullValue?: null;
    geoPointValue?: {
        latitude: number;
        longitude: number;
    };
    booleanValue?: boolean;
    arrayValue?: {
        values: FirestoreValue[]
    };
    mapValue?: {
        fields: Record<string, FirestoreValue>;
    };
    referenceValue?: {};
}