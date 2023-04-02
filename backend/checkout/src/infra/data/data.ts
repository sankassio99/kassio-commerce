import Order from '../../domain/entities/Order';

export default {
    jsonProducts: [
        {
            desc: "Notebook", price: 15, height: 10, weight: 3,
            deep: 10, quantity: 1, width: 5, id: "1",
        },
        {
            desc: "Playstation 4", price: 25, height: 10, weight: 8,
            deep: 10, quantity: 1, width: 10, id: "2",
        },
        {
            desc: "Tv LED 4k", price: 30, height: 5, weight: 5,
            deep: 10, quantity: 1, width: 1, id: "3",
        },
        {
            desc: "Iphone 14 - Imported", price: 999, height: 5, weight: 5,
            deep: 10, quantity: 1, width: 1, id: "4", currency: "USD",
        },
    ],
    jsonOrders: [new Order("407.302.170-27")],
    jsonCoupons: [
        { code: "VALE20", expired: false, desc: "VALE20", value: 20, expireDate: "2025-10-01T10:00:00" },
        { code: "VALE10", expired: true, desc: "VALE10", value: 10, expireDate: "2021-10-01T10:00:00" },
    ]
}