import ICurrencyGateway from "../../application/gateway/iCurrencyGateway";

export default class CurrencyApiFake implements ICurrencyGateway {
    constructor() {
    }

    async getCurrencies(): Promise<any> {
        return {usd: 3}
    }
    getCurrency(currency: string): number {
        if(currency == "USD") return 3;

        return 1;
    }

}