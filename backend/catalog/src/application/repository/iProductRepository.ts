import Product from "../../domain/entities/Product";

export default interface IProductRepository {
    get(id : string): Promise<Product>;
    getAll(): Promise<Product[]>;
    save(product : Product) : Promise<void>;
}