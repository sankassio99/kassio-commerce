import GetProducts from "../../src/application/usecase/GetProducts";
import ProductRepositoryFake from "../../src/infra/repository/productRepositoryFake";

beforeEach(()=>{


})

test('Should get product by id', async () => {
    // Arrange
    let productRepository = new ProductRepositoryFake();
    const getProduct = new GetProducts(productRepository);
    const productId = "1";
    
    // Act
    let product = await getProduct.execute(productId);
    
    // Assert
    expect(product.name).toBe("Notebook");
});