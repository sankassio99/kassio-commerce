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
import IDeliveryGateway from "./application/gateway/IDeliveryGateway";
import DeliveryGateway from "./infra/gateway/DeliveryGateway";
import ICatalogGateway from "./application/gateway/ICatalogGateway";
import CatalogGateway from "./infra/gateway/CatalogGateway";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())

let checkout: Checkout;
let currencyGateway: ICurrencyGateway;
let productRepository: IProductRepository;
let couponRepository: ICouponRepository;
let orderRepository: IOrderRepository;
let deliveryGateway: IDeliveryGateway;
let catalogGateway: ICatalogGateway;

app.post("/checkout", async function (req: Request, res: Response) {
    productRepository = new ProductRepositoryFake();
    couponRepository = new CouponRepositoryFake();
    orderRepository = new OrderRepositoryFake();
    currencyGateway = new CurrencyApiFake();
    deliveryGateway = new DeliveryGateway();
    catalogGateway = new CatalogGateway();

    checkout = new Checkout(
        currencyGateway,
        productRepository,
        couponRepository,
        orderRepository,
        deliveryGateway,
        catalogGateway
    );

    try {
      const output = await checkout.execute(req.body);
      res.json(output);
    } catch (e: any) {
      res.status(422).json({
        message: e.message
      });
    }
});

app.listen(3000);

type Output = {
    message?: string;
    total?: number;
    order?: Order;
    freight: number;
};