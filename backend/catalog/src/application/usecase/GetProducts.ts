import IProductRepository from "../repository/iProductRepository";


export default class GetProducts {

    constructor(readonly productRepository : IProductRepository) { 
    }

    async execute(id : string) : Promise<Output> {
        const product = await this.productRepository.get(id);
        const output = Object.assign(product, {
            volume: product.getVolume(),
            density: product.getDensity(),
        });

        return output;
    }

}

type Output = {
	id: string,
    desc: string,
    price: number,
    quantity: number,
    width: number,
    height: number,
    deep: number,
    weight: number,
    currency : string,
    volume: number,
    density: number,
}