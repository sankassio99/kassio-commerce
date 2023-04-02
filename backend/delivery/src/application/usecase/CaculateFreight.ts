import FreightCalculator from "../../domain/entities/FreightCalculator";
import Product from "../../domain/entities/Product";

export default class CalculateFreight {
    constructor() {}

    async execute(input: Input): Promise<Output> {
        const output: Output = {
            freight: 0,
        };
        if (input.items) {
            for (const item of input.items) {
                const product = new Product({
                    width: item.width,
                    height: item.height,
                    length: item.length,
                    weight: item.weight,
                    id: item.id,
                });
                const itemFreight = FreightCalculator.calculate(
                    product,
                    item.quantity
                );
                output.freight += itemFreight;
            }
        }
        return output;
    }
}

type Input = {
    items: {
        width: number;
        height: number;
        length: number;
        weight: number;
        id: string;
        quantity: number;
    }[];
};

type Output = {
    freight: number;
};
