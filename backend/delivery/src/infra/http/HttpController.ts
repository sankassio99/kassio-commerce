import CalculateFreight from "../../application/usecase/CaculateFreight";
import HttpServer from "./IHttpServer";


export default class HttpController {

	constructor (
		readonly httpServer: HttpServer, 
        readonly calculateFregth: CalculateFreight
	) {
		httpServer.on("post", "/calculateFregth", async function (params: any, body: any) {
            console.log(body);
			const output = await calculateFregth.execute(body);
			return output;
		});

        httpServer.listen(3001);
	}
}