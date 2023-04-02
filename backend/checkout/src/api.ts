import express, { Request, Response } from "express";
import ICurrencyGateway from "./application/gateway/iCurrencyGateway";
import Order from "./domain/entities/Order";
import CurrencyApiFake from "./infra/gateway/currencyApiFake";
import Checkout from "./application/usecase/Checkout";
import IProductRepository from "./application/repository/iProductRepository";
import ICouponRepository from "./application/repository/iCouponRepository";
import IOrderRepository from "./application/repository/iOrderRepository";
import ProductRepositoryFake from "./infra/repository/productRepositoryFake";
import CouponRepositoryFake from "./infra/repository/couponRepositoryFake";
import OrderRepositoryFake from "./infra/repository/orderRepositoryFake";
import GetProducts from "./application/usecase/GetProducts";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())

let checkout: Checkout;
let currencyGateway: ICurrencyGateway;
let productRepository: IProductRepository;
let couponRepository: ICouponRepository;
let orderRepository: IOrderRepository;
let output: Output;
let getProducts: GetProducts;

app.post("/checkout", async function (req: Request, res: Response) {
    productRepository = new ProductRepositoryFake();
    couponRepository = new CouponRepositoryFake();
    orderRepository = new OrderRepositoryFake();
    currencyGateway = new CurrencyApiFake();

    checkout = new Checkout(
        currencyGateway,
        productRepository,
        couponRepository,
        orderRepository
    );

    try {
      const output = await checkout.execute(req.body);
      res.json(output);
    } catch (e: any) {
      console.log(e)
      res.status(422).json({
        message: e.message
      });
    }
});

app.get("/products", async function (req: Request, res: Response) {
    productRepository = new ProductRepositoryFake();
    getProducts = new GetProducts(productRepository);
    let response = await getProducts.execute();
    res.status(200).json({
      response
    });
});

app.listen(3000);

type Output = {
    message?: string;
    total?: number;
    order?: Order;
    freight: number;
};