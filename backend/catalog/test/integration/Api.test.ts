import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test('Should get all products', async () => {
    const response = await axios.get("http://localhost:3003/products");
    const output = response.data;
    expect(output.length).toBe(4);
    expect(output[0].description).toBe("Notebook");
});

test('Should get product by id', async () => {
    const productId = "2";
    const response = await axios.get(`http://localhost:3003/products/${productId}`);
    const output = response.data;
    expect(output.desc).toBe("Playstation 4");
    expect(output.id).toBe(productId);
});