import FreightCalculator from "../../domain/entities/FreightCalculator";
import Product from "../../domain/entities/Product";

export default class CalculateFreight {

	constructor (
	) {
	}

	async execute (input: Input): Promise<Output> {
		const output: Output = {
			freight: 0
		};
		if (input.items) {
			for (const item of input.items) {
				const itemFreight = FreightCalculator.calculate(item.product, item.quantity);
				output.freight += itemFreight;
			}
		}
		return output;
	}
}

type Input = {
	items: { product: Product, quantity: number }[],
}

type Output = {
	freight: number
}