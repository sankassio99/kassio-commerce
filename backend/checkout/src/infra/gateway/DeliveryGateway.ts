import axios from "axios";
import IDeliveryGateway, { Input, Output } from "../../application/gateway/IDeliveryGateway";

export default class DeliveryGateway implements IDeliveryGateway {
    constructor() {
    }

    async calculateFreight(input: Input): Promise<Output> {
        const response = await axios.post("http://localhost:3001/calculateFreigth", input);
        console.log(response)
        return response.data;
    }

}