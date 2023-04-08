import express from "express";
import IProductRepository from "./application/repository/iProductRepository";
import ProductRepositoryFake from "./infra/repository/productRepositoryFake";
import GetProduct from "./application/usecase/GetProduct";
import GetProductsCatalog from "./application/usecase/GetProductsCatalog";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ProductController from "./infra/http/ProductController";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())

let productRepository: IProductRepository;
productRepository = new ProductRepositoryFake();

let httpServer = new ExpressAdapter();
let getProducts = new GetProduct(productRepository);
let getProductsCatalog = new GetProductsCatalog(productRepository);

new ProductController(httpServer, getProducts, getProductsCatalog);

httpServer.listen(3003);
