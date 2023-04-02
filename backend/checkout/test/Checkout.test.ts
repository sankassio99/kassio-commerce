import IOrderRepository from "../src/application/repository/iOrderRepository";
import CurrencyApiFake from "../src/infra/gateway/currencyApiFake";
import Checkout from "../src/application/usecase/Checkout";
import ICouponRepository from "../src/application/repository/iCouponRepository";
import IProductRepository from "../src/application/repository/iProductRepository";
import ProductRepositoryFake from "../src/infra/repository/productRepositoryFake";
import CouponRepositoryFake from "../src/infra/repository/couponRepositoryFake";
import OrderRepositoryFake from "../src/infra/repository/orderRepositoryFake";
import sinon from "sinon";
import Product from "../src/domain/entities/Product";
import ICurrencyGateway from "../src/application/gateway/iCurrencyGateway";
import IDeliveryGateway, { Input, Output } from "../src/application/gateway/IDeliveryGateway";
import DeliveryGateway from "../src/infra/gateway/DeliveryGateway";

let checkout: Checkout;
let currencyGateway: ICurrencyGateway;
let productRepository: IProductRepository;
let couponRepository: ICouponRepository;
let orderRepository: IOrderRepository;
let deliveryGateway: IDeliveryGateway;

beforeEach(() => {
    productRepository = new ProductRepositoryFake();
    couponRepository = new CouponRepositoryFake();
    orderRepository = new OrderRepositoryFake();
    currencyGateway = new CurrencyApiFake();
    deliveryGateway = new DeliveryGateway();
    

    checkout = new Checkout(
        currencyGateway,
        productRepository,
        couponRepository,
        orderRepository,
        deliveryGateway
    );
});

test("should save order in database persistence", async () => {
    // use spy when you need verify if function is called 
	const spyOrderRepository = sinon.spy(OrderRepositoryFake.prototype, "save");

    // Ararnge
    const input = {
        cpf: "407.302.170-27",
        items: [],
    };
    // Act
    await checkout.execute(input);
    //Arrange
    expect(spyOrderRepository.calledOnce).toBeTruthy();
    
});

test("Should create a order with 1 product in dolar value", async function () {
    // Arrange
    const price = 999;
    const usdCurrency = 3;

    // use stub when you want to controll method behavior to return a specific value to direct the right path
    const stubCurrencyGateway = sinon.stub(CurrencyApiFake.prototype, "getCurrencies").resolves({
		usd: usdCurrency
	});
	const stubProductRepository = sinon.stub(ProductRepositoryFake.prototype, "get").resolves(
		new Product({
            desc: "Iphone 14 - Imported", price: price, height: 5, weight: 5,
            deep: 10, quantity: 1, width: 1, id: "4", currency: "USD",
        }),
	)

	const input = {
		cpf: "407.302.170-27",
		items: [
			{ id: 4, quantity: 1 },
		]
	};
	const output = await checkout.execute(input);
    const expectPrice = price * usdCurrency;
	expect(output.total).toBe(expectPrice);
    stubCurrencyGateway.restore();
	stubProductRepository.restore();
});

// const orderRepository = class implements IOrderRepository {
//     getOrder(id: String): Promise<any> {
//         throw new Error("Method not implemented.");
//     }
//     save(order: Order): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
// }
