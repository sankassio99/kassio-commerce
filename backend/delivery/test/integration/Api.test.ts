import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test('Should test freight calculator', async () => {
    const input = {
		items: [
			{ width: 100, height: 30, length: 10, weight: 3, id:"1", quantity:2},
		],
		from: "22060030",
		to: "88015600"
	};
    const response = await axios.post("http://localhost:3001/calculateFregth", input);
    const output = response.data;
    expect(output.freight).toBe(60);
});