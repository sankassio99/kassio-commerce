import { v4 as uuidv4 } from 'uuid';

export default class Product {
    id: string;
    desc: string;
    price: number;
    quantity: number;
    width: number;
    height: number;
    deep: number;
    weight: number;
    currency : string;

    constructor({ desc, price,
        quantity, width, height,
        deep: length, weight, currency, id }: {
            desc: string, price: number,
            quantity: number, width: number, height: number,
            deep: number, weight: number, currency? : string, id?: string
        }) {
        if (id) {
            this.id = id;
        } else {
            this.id = uuidv4();
        }
        this.desc = desc;
        this.price = price;
        this.quantity = quantity;
        this.width = width;
        this.height = height;
        this.deep = length;
        this.weight = weight;
        this.currency = currency ? currency : "BRL";
    }

    getVolume() {
		return this.width/100 * this.height/100 * this.deep/100;
	}

    getDimensions() {
        return {
            width: this.width,
            height: this.height,
            length: this.deep,
            weight: this.weight,
        }
    }

    getDensity(): any {
        return this.getVolume()/this.weight;
    }
}