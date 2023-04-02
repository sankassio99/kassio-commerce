import sinon from "sinon";
import OrderRepositoryFake from "../src/infra/repository/orderRepositoryFake";
import Order from "../src/domain/entities/Order";
import GetOrder from "../src/application/usecase/GetOrder";
import crypto from "crypto";

beforeEach(() => {});

test("Should get order by code", async () => {
    // Arrange
    const uuid = crypto.randomUUID();
    const cpf = "407.302.170-27";
    const date = new Date("2023-10-01T10:00:00");
    const code = `${date.getFullYear()}${new String(uuid).padStart(8, "0")}`;

    const stubOrderRepository = sinon
        .stub(OrderRepositoryFake.prototype, "getOrder")
        .resolves(new Order(cpf, undefined, 100, uuid, date));

    let orderRepository = new OrderRepositoryFake();
    const getOrder = new GetOrder(orderRepository);
    // Act
    let order: any = await getOrder.execute(code);
    // Assert
    expect(order.code).toBe(code);
    expect(stubOrderRepository.calledOnce).toBeTruthy();
});
