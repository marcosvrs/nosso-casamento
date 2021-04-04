export default class Item {
    readonly id: string;
    readonly name: string;
    readonly value: number;
    readonly image: number;
    readonly description?: string;

    constructor(id: string, name: string, value: number, image: number, description?: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.image = image;
        this.description = description;
    }

    getValueCurrency() {
        return this.value.toLocaleString(undefined, { style: 'currency', currency: 'BRL' });
    }
}