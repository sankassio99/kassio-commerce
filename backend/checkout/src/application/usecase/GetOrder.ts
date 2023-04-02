import Order from "../../domain/entities/Order";
import IOrderRepository from "../repository/iOrderRepository";


export default class GetOrder {

	constructor (
		readonly orderRepository: IOrderRepository
	) {
	}

	async execute (id: string): Promise<Output> {
		const order : Order = await this.orderRepository.getOrder(id);
		const output: Output = {
			code: order.getCode(),
			total: order.getTotal(),
			freight: order.freight
		};
		return output;
	}
}

type Output = {
	code: string,
	total: number,
	freight: number
}
