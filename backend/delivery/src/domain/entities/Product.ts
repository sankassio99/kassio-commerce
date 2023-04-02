import { v4 as uuidv4 } from 'uuid';

export default class Product {
	
    id: string;
    width: number;
    height: number;
    length: number;
    weight: number;

    constructor({ width, height, length, weight, id }: {
            width: number, height: number, length: number, weight: number, id: string
        }) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }

    getVolume() {
		return this.width/100 * this.height/100 * this.length/100;
	}
}