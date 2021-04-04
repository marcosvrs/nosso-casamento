export default class Item {
    readonly id: string;
    readonly name: string;
    readonly value: number;
    readonly image: number;

    constructor(id: string, name: string, value: number, image: number) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.image = image;
    }
}