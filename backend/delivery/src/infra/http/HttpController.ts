import CalculateFreight from "../../application/usecase/CaculateFreight";
import HttpServer from "./IHttpServer";


export default class HttpController {

	constructor (
		readonly httpServer: HttpServer, 
        readonly calculateFreigth: CalculateFreight
	) {
		httpServer.on("post", "/calculateFreigth", async function (params: any, body: any) {
			const output = await calculateFreigth.execute(body);
			return output;
		});

        httpServer.listen(3001);
	}
}