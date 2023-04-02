import IOrderRepository from '../../application/repository/iOrderRepository';
import data from '../data/data';
import Order from '../../domain/entities/Order';

export default class OrderRepositoryFake implements IOrderRepository {
    constructor() {
    }

    async save(order : Order) : Promise<void> {
        data.jsonOrders.push(order);
    }

    async getOrder(id: String): Promise<any> {
        
    }
}