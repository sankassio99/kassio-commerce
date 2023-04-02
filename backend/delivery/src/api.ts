import CalculateFreight from "./application/usecase/CaculateFreight";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";


let calculateFreight = new CalculateFreight();
let httpServer = new ExpressAdapter();

new HttpController(httpServer, calculateFreight)
