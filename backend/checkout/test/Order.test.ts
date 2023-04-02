import Order from "../src/domain/entities/Order";
import Product from "../src/domain/entities/Product";
import crypto from "crypto";
import CurrencyTable from "../src/domain/entities/CurrencyTable";
import Coupon from "../src/domain/entities/Coupon";

let currencyTable: CurrencyTable;

beforeEach(function () {
    currencyTable = new CurrencyTable();
});

test("should create a empty order", () => {
    const uuid = crypto.randomUUID();
    const order = new Order("746.971.314-01", currencyTable, undefined, uuid);
    expect(order.getTotal()).toBe(0);
});

test("Should create a order with 3 products", function () {
    // Ararnge
    let product1 = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "1",
    });
    let product2 = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "2",
    });
    let product3 = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "3",
    });

    let products = [product1, product2, product3];

    // Act
    let order = new Order("746.971.314-01", currencyTable);
    order.addItems(products);

    // Assert
    var res = order.getOrderDetails();
    expect(res.products.length).toBe(3);
});

test("Should calculate total value", function () {
    // Ararnge
    let product1 = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "1",
    });
    let product2 = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "2",
    });
    let product3 = new Product({
        desc: "",
        price: 100.0,
        quantity: 3,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "3",
    });
    let products = [product1, product2, product3];

    // Act
    let order = new Order("746.971.314-01", currencyTable);
    order.addItems(products);

    // Assert
    let expectTotalValue = 500;
    let totalValue = order.getTotal();
    expect(totalValue).toBe(expectTotalValue);
});

test("Should get total value with discount after associate coupon", function () {
    // Ararnge
    let product1 = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "1",
    });
    let product2 = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "2",
    });
    let product3 = new Product({
        desc: "",
        price: 100.0,
        quantity: 3,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "3",
    });
    let products = [product1, product2, product3];

    let discountCoupon = new Coupon("VALE10", 10, new Date("2023-10-01T10:00:00"));

    // Act
    let order = new Order("746.971.314-01", currencyTable);
    order.addItems(products);
    order.addDiscountCoupon(discountCoupon);

    // Assert
    let expectTotalValue = 450;
    let totalValue = order.getTotal();
    expect(totalValue).toBe(expectTotalValue);
});

test("should not create a Order with invalid CPF", () => {
    const uuid = crypto.randomUUID();
    expect(
        () => new Order("666.666.666-11", currencyTable, undefined, uuid)
    ).toThrow(new Error("Invalid cpf"));
});

test("Should not add item with quantity invalid", function () {
    // Ararnge
    let product = new Product({
        desc: "",
        price: 100.0,
        quantity: -1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        id: "1",
    });

    // Act
    let order = new Order("746.971.314-01", currencyTable);

    // Assert
    expect(() => order.addItem(product, -10)).toThrow(
        new Error("Invalid quantity")
    );
});

test("Should add item with dolar currency and convert total to real currency", function () {
    // Ararnge
    const dolarCurrency = 3;
    currencyTable.addCurrency("USD",dolarCurrency);
    let product = new Product({
        desc: "",
        price: 100.0,
        quantity: 1,
        width: 100,
        height: 30,
        deep: 10,
        weight: 10,
        currency: "USD",
        id: "1",
    });

    // Act
    let order = new Order("746.971.314-01", currencyTable);
    order.addItem(product, 1);

    // Assert
    const expectValue = product.price * dolarCurrency;
    expect(order.getTotal()).toBe(expectValue);
});

test("When a order is created must generate order code based on date", function () {
    // Arrange
    const uuid = crypto.randomUUID();
    const cpf = "407.302.170-27";
    const date = new Date("2023-10-01T10:00:00");

    // Act
    const order = new Order(cpf, currencyTable, undefined, uuid, date);

    // Assert
    const expectedCode = `${date?.getFullYear()}${new String(uuid).padStart(8, "0")}`;
    expect(order.getCode()).toBe(expectedCode);
});