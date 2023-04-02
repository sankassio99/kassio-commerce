import CalculateFreight from "../src/application/usecase/CaculateFreight";

let calculateFreight: CalculateFreight;

beforeEach(function () {
	calculateFreight = new CalculateFreight();
});

test("Should calculate a freight to a order with 1 item", async function () {
	const input = {
		items: [
			{ width: 100, height: 30, length: 10, weight: 3, id:"1", quantity:2},
		],
		from: "22060030",
		to: "88015600"
	};
	const output = await calculateFreight.execute(input);
	expect(output.freight).toBe(60);
});
