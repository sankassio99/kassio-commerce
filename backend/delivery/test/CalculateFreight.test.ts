import CalculateFreight from "../src/application/usecase/CaculateFreight";
import Product from "../src/domain/entities/Product";

let calculateFreight: CalculateFreight;

beforeEach(function () {
	calculateFreight = new CalculateFreight();
});

test("Should calculate a freight to a order with 1 item", async function () {
	const product = new Product({width: 100, height: 30, length: 10, weight: 3, id:"1"})
	const input = {
		items: [
			{ product , quantity:2},
		],
		from: "22060030",
		to: "88015600"
	};
	const output = await calculateFreight.execute(input);
	expect(output.freight).toBe(60);
});
