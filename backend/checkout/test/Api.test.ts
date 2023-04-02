import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test('Dont should accept a order with invalid CPF', async () => {
    const input = {
        cpf: "406.302.170-27"
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.message).toBe("Invalid cpf");
});

test('Should create a order', async () => {
    const input = {
        cpf: "406.302.170-27"
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.message).toBeNull;
});

test('Should create a order with 3 products', async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { id: '1', quantity: 1 },
            { id: '2', quantity: 1 },
            { id: '3', quantity: 3 },
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.total).toBe(130);
});
test('Should create a order with 3 products with discount coupon', async () => {
    const input = {
        cpf: "583.767.960-03",
        items: [
            { id: '1', quantity: 1 },
            { id: '2', quantity: 1 },
            { id: '3', quantity: 3 },
        ],
        coupon: "VALE20",
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.total).toBe(104);
    expect(output.message).toBe(undefined);
});

test('Should not apply a expired discount coupon', async () => {
    const input = {
        cpf: "345.229.790-02",
        items: [
            { id: '1', quantity: 2 },
        ],
        coupon: "VALE10",
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.total).toBe(30);
    expect(output.message).toBe("Discount coupon invalid");
});

test('Should not create a order with negative product quantity', async () => {
    const input = {
        cpf: "345.229.790-02",
        items: [
            { id: '1', quantity: -2 },
        ],
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.message).toBe("Invalid quantity");
});
test('Should create a order with 3 products and freight value included', async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { id: '1', quantity: 1 },
            { id: '2', quantity: 1 },
            { id: '3', quantity: 1 },
        ],
        from:"77060038",
        to:"77060018",
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.freight).toBe(160);
    expect(output.total).toBe(70);
});
test('Should return minimum freight value when its was smaller than minimum', async () => {
    const input = {
        cpf: "407.302.170-27",
        items: [
            { id: '3', quantity: 1 },
        ],
        from:"77060038",
        to:"77060018",
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.freight).toBe(50);
    expect(output.total).toBe(30);
});

test('Should get all products', async () => {
    const response = await axios.get("http://localhost:3000/products");
    const output = response.data;
    expect(response.status).toBe(200);
    expect(output != null).toBeTruthy();
});

