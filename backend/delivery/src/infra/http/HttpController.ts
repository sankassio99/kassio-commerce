import CalculateFreight from "../../application/usecase/CaculateFreight";
import HttpServer from "./IHttpServer";


export default class HttpController {

	constructor (
		readonly httpServer: HttpServer, 
        readonly calculateFregth: CalculateFreight
	) {
		httpServer.on("post", "/calculateFregth", async function (params: any, body: any) {
			const output = await calculateFregth.execute();
			return output;
		});
	}
}