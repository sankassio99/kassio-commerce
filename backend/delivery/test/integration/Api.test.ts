import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test.skip('Dont should accept a order with invalid CPF', async () => {
    const input = {
        cpf: "406.302.170-27"
    };
    const response = await axios.post("http://localhost:3000/checkout", input);
    const output = response.data;
    expect(output.message).toBe("Invalid cpf");
});