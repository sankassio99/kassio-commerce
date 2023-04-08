import GetProduct from "../../src/application/usecase/GetProduct";
import ProductRepositoryFake from "../../src/infra/repository/productRepositoryFake";

beforeEach(()=>{


})

test('Should get product by id', async () => {
    // Arrange
    let productRepository = new ProductRepositoryFake();
    const getProduct = new GetProduct(productRepository);
    const productId = "1";
    
    // Act
    let product = await getProduct.execute(productId);
    
    // Assert
    expect(product.desc).toBe("Notebook");
});