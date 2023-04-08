import ICouponRepository from "../repository/iCouponRepository";
import ICurrencyGateway from "../gateway/iCurrencyGateway";
import IProductRepository from "../repository/iProductRepository";
import IOrderRepository from "../repository/iOrderRepository";
import Order from "../../domain/entities/Order";
import CurrencyTable from "../../domain/entities/CurrencyTable";
import IDeliveryGateway, { Input as DeliveryGatewayInput } from "../gateway/IDeliveryGateway";

export default class Checkout {

	constructor (
		readonly currencyGateway: ICurrencyGateway,
		readonly productRepository: IProductRepository,
		readonly couponRepository: ICouponRepository,
		readonly orderRepository: IOrderRepository,
		readonly deliveryGateway: IDeliveryGateway, 
		readonly currencyTable = new CurrencyTable(),
	) {
	}

	async execute (input: Input): Promise<Output> {
		const currencies = await this.currencyGateway.getCurrencies();
		this.currencyTable.addCurrency("USD", currencies.usd);
		const order = new Order(input.cpf, this.currencyTable);
		let freight = 0;
		const freightInput : DeliveryGatewayInput = { items: [] };
		if (input.items) {
			for (const item of input.items) {
				const product = await this.productRepository.get(item.id);
				order.addItem(product, item.quantity);
				freightInput.items.push({
					width: product.width,
					height: product.height,
					length: product.deep,
					weight: product.weight,
					id: product.id,
					quantity: item.quantity,
				});
			}
		}
		const freightOutput = await this.deliveryGateway.calculateFreight(freightInput);
		freight = freightOutput.freight;
		if (input.from && input.to) {
			order.freight = freight;
		}
		let message;
		if (input.coupon) {
			const coupon = await this.couponRepository.get(input.coupon);
			if(coupon.isExpired(new Date())){
				message = "Discount coupon invalid";
			}else{
				order.addDiscountCoupon(coupon);
			}
		}
		let total = order.getTotal();
		await this.orderRepository.save(order);
		return {
			total,
			freight,
			message,
		};
	}
}

type Input = {
	cpf: string,
	items: { id: number, quantity: number }[],
	coupon?: string,
	from?: string,
	to?: string
}

type Output = {
	total: number,
	freight: number,
	message?: string,
}