import FreightCalculator from "../src/domain/entities/FreightCalculator";
import Product from "../src/domain/entities/Product";


test("Should calculate product freght of a item with 1 quantity", function () {
	const product = new Product({
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
        id: "1",
    });
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(30);
});

test("Should calculate product freght with quantity 3", function () {
	const product = new Product({
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
        id: "1",
    });
	const freight = FreightCalculator.calculate(product, 3);
	expect(freight).toBe(90);
});

test("Should calculate product freght with minimum price", function () {
	const product = new Product({
        width: 10,
        height: 10,
        length: 10,
        weight: 0.9,
        id: "1",
    });
	const freight = FreightCalculator.calculate(product);
	expect(freight).toBe(10);
});
