import Product from "../../domain/entities/Product";

export default interface ICatalogGateway {
    getAllProducts(): Promise<Product[]>;
    getProduct(id : string) :  Promise<Product> ;
}