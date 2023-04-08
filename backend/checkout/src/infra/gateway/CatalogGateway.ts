import axios from "axios";
import ICatalogGateway from "../../application/gateway/ICatalogGateway";
import Product from "../../domain/entities/Product";

export default class CatalogGateway implements ICatalogGateway {
    constructor() {
    }

    async getAllProducts(): Promise<Product[]> {
        const response = await axios.get("http://localhost:3003/products");
        const products: Product[] = [];
        for (const productData of response.data){
            products.push(new Product({
                desc: productData.desc,
                price: productData.price,
                quantity: productData.quantity,
                width: productData.width,
                height: productData.height,
                deep: productData.deep,
                weight: productData.weight,
            }));
        }
        return products;
    }

    async getProduct(id: string):  Promise<Product> {
        const response = await axios.get(`http://localhost:3003/products/${id}`);
        const product = new Product({
                desc: response.data.desc,
                price: response.data.price,
                quantity: response.data.quantity,
                width: response.data.width,
                height: response.data.height,
                deep: response.data.deep,
                weight: response.data.weight,
            });
        return product;
    }
}