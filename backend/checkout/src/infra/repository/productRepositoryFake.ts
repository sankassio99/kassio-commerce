import IProductRepository from '../../application/repository/iProductRepository';
import data from '../data/data';
import Product from '../../domain/entities/Product';

export default class ProductRepositoryFake implements IProductRepository {
    constructor() {
    }

    async getAll(): Promise<Product[]> {
        let products = data.jsonProducts.map(data => this.createOutput(data));
        return products;
    }

    async save(product: Product): Promise<void> {
        const input: Input = this.createInput(product)
        data.jsonProducts.push(input);
    }

    async get(idProduct: number): Promise<any> {
        const product = data.jsonProducts.find((element) => parseInt(element.id) == idProduct);
        if (!product) {
            throw new Error(`Product ${idProduct} not found`);
        }
        return this.createOutput(product);
    }

    private createOutput(product: any): Product {
        return new Product({
            desc: product.desc,
            price: product.price,
            quantity: product.quantity,
            width: product.width,
            height: product.height,
            deep: product.deep,
            weight: product.weight,
        });
    }

    private createInput(product: Product): Input {
        return {
            id: product.id,
            desc: product.desc,
            price: product.price,
            quantity: product.quantity,
            width: product.width,
            height: product.height,
            deep: product.deep,
            weight: product.weight,
            currency: product.currency
        };
    }
}

type Input = {
    id: string,
    desc: string,
    price: number,
    quantity: number,
    width: number,
    height: number,
    deep: number,
    weight: number,
    currency: string
}