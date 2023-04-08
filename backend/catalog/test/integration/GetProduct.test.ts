import GetProducts from "../../src/application/usecase/GetProducts";
import ProductRepositoryFake from "../../src/infra/repository/productRepositoryFake";

beforeEach(()=>{


})

test('Should get product by id', async () => {
    // Arrange
    let productRepository = new ProductRepositoryFake();
    const getProduct = new GetProducts(productRepository);
    
    // Act
    let product = await getProduct.execute();
    
    // Assert
    expect(allProducts.length).toBe(dataFake.length);
    expect(stubproductRepository.calledOnce).toBeTruthy();
});