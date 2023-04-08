import IProductRepository from "../repository/iProductRepository";


export default class GetProducts {

    constructor(readonly productRepository : IProductRepository) { 
    }

    async execute() : Promise<any> {
        let output : Output = [];
        const products = await this.productRepository.getAll();

        products.forEach(product => {
            output.push({
                id: product.id,
                description: product.desc,
                price: product.price,
            })
        });
         
        return output;
    }

}

type Output = {
	id: string,
	description: string,
	price: number
}[]