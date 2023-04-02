import GetProducts from "../src/application/usecase/GetProducts";
import ProductRepositoryFake from "../src/infra/repository/productRepositoryFake";
import sinon from "sinon";
import Product from "../src/domain/entities/Product";

beforeEach(()=>{


})

test('Should get all products', async () => {
    const dataFake = [
        new Product({
            desc: "Tv LED 4k", price: 30, height: 5, weight: 5,
            deep: 10, quantity: 1, width: 1, id: "3",
        }),
        new Product({
            desc: "Playstation 4", price: 25, height: 10, weight: 8,
            deep: 10, quantity: 1, width: 10, id: "2",
        })
    ];
    // Arrange
    const stubproductRepository = sinon.stub(ProductRepositoryFake.prototype, "getAll").resolves(
		dataFake
	);
    let productRepository = new ProductRepositoryFake();
    const getProducts = new GetProducts(productRepository);
    // Act
    let allProducts : any[] = await getProducts.execute();
    // Assert
    expect(allProducts.length).toBe(dataFake.length);
    expect(stubproductRepository.calledOnce).toBeTruthy();
});