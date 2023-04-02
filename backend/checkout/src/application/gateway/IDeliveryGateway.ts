export default interface IDeliveryGateway {
    calculateFreight(input: Input): Promise<Output>;
}

export type Input = {
    items: {
        width: number,
        height: number,
        length: number,
        weight: number,
        id: string,
        quantity: number
    }[]
}

export type Output = {
    freight: number
}