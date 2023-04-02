export default interface ICurrencyGateway {
    getCurrencies(): Promise<any>;
    getCurrency(currency : string) : number ;
}