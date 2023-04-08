import GetProduct from "../../application/usecase/GetProduct";
import GetProductsCatalog from "../../application/usecase/GetProductsCatalog";
import HttpServer from "./IHttpServer";


export default class ProductController {

	constructor (
		readonly httpServer: HttpServer, 
        readonly getProduct: GetProduct,
        readonly getProductsCatalog: GetProductsCatalog
	) {
		httpServer.on("get", "/products", async function (params: any, body: any) {
			const output = await getProductsCatalog.execute();
			return output;
		});

		httpServer.on("get", "/products/:id", async function (params: any, body: any) {
			const output = await getProduct.execute(params.id);
			return output;
		});
	}
}