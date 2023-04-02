import { v4 as uuidv4 } from 'uuid';

export default class Product {
	
    id: string;
    width: number;
    height: number;
    deep: number;
    weight: number;
    quantity: number;

    constructor({ quantity ,width, height,
        deep: length, weight, id }: {
            quantity: number, width: number, height: number,
            deep: number, weight: number, currency? : string, id: string
        }) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.deep = length;
        this.weight = weight;
        this.quantity = quantity;
    }

    getVolume() {
		return this.width/100 * this.height/100 * this.deep/100;
	}
}