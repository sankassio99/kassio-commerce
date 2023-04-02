export default class Item {
    constructor(
        readonly productId: string | number,
        readonly unitPrice: number,
        readonly quantity: number,
        readonly currency: string,
    ) {}
}
