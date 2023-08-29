import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ProductSize } from './product-size';
import { promisify } from 'util';
import { MockMongooseService } from '@/common/provider/mock-mongoose-service';


describe('ProductService', () => {
  let productService: ProductService;
  let productModel: MockMongooseService<Product>;
  const { ObjectId } = Types;
  let productDTO: ProductDTO;
  let mongoConnection: Connection;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: MockMongooseService,
          useClass: MockMongooseService,
        },
        {
          provide: getModelToken(Product.name),
          useClass: MockMongooseService,
        }
      ],
    }).compile();
    productDTO = {
      sizes: [ProductSize.LARGE],
      rating: 0,
      discountIsActive: false,
      id: new Types.ObjectId('63c95a56bd14cbe9fbcbab35'),
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
      desc:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      category: "men's clothing",
      colors: ['ash', 'purple'],
      price: 22.3,
      inStock: true,
      createdAt: new Date('2023-01-19T14:57:26.204Z'),
      updatedAt: new Date('2023-06-14T14:57:26.204Z'),
    };
    productService = module.get<ProductService>(ProductService);
    productModel = module.get<MockMongooseService<Product>>(MockMongooseService);
  });
  
  afterAll(async () => {

  });

  // Test for createProduct method
  it('should create a new product', async () => {

    // const newProd = await productModel.create(productDTO);

    const savedProd = jest.spyOn(productModel, 'save').mockReturnValue(productDTO);
    // const spy = jest.spyOn(newProd, "save").mockResolvedValue(productDTO as ProductDocument & { _id: typeof ObjectId })
    const createdProduct: ProductDTO = await productService.createProduct(productDTO);
    expect(createdProduct.title).toBe(productDTO.title);
    expect(createdProduct.price).toBe(productDTO.price);
    expect(createdProduct.category).toBe(productDTO.category);
    expect(createdProduct).toEqual(savedProd);
    // expect(spy).toBeCalledTimes(2);
  });

  // Test for getProduct method
  it('should get a product by id', async () => {
    const prodIdObjId = new ObjectId();
    const productId = prodIdObjId._id.toHexString();

    const jestProd = jest.spyOn(productModel, 'findById').mockReturnValue(productDTO);

    const product: ProductDTO = await productService.getProduct(productId);
    expect(product.id).toBe(productId.toString());
  });

  // Test for getProducts method
  it('should get a list of products', async () => {
    const products: ProductDTO[] = await productService.getProducts();
    expect(products.length).toBe(1); // Assuming we have one mocked product
  });

  // Test for deleteProduct method
  it('should delete a product by id', async () => {
    const productId = new ObjectId().toHexString();

    const deletedProduct: ProductDTO = await productService.deleteProduct(productId);
    expect(deletedProduct.id).toBe(productId.toString());
  });

  // Test for updateProduct method
  it('should update a product by id', async () => {
    const productId = new ObjectId().toHexString();
    const updatedProductDTO: Partial<ProductDTO> = {
      title: 'Updated Product',
    };

    const updatedProduct: ProductDTO = await productService.updateProduct(productId, updatedProductDTO);
    expect(updatedProduct.id).toBe(productId.toString());
    expect(updatedProduct.title).toBe(updatedProductDTO.title);
  });

  // Test for replaceProduct method
  it('should replace a product by id', async () => {
    const productId = new ObjectId().toHexString();
    const replacedProductDTO: ProductDTO = {
      title: 'Replaced Product',
      price: 200,
      category: 'Replaced Category',
      desc: '',
      image: '',
      sizes: [],
      colors: [],
      rating: 0,
      discountIsActive: false,
      inStock: false,
      createdAt: undefined,
      updatedAt: undefined
    };

    const replacedProduct: ProductDTO = await productService.replaceProduct(productId, replacedProductDTO);
    expect(replacedProduct.id).toBe(productId.toString());
    expect(replacedProduct.title).toBe(replacedProductDTO.title);
    expect(replacedProduct.price).toBe(replacedProductDTO.price);
    expect(replacedProduct.category).toBe(replacedProductDTO.category);
  });
});

/**
 * 

  it("should create a new product", async () => {
    const prod = new ProductDTO();
    prod.sizes = [ProductSize.MEDIUM];
    prod.title = 'Mockmock';
    prod.id = "6fe8230a3b01823f3";
    prod.price = 342.52;

    const newProd = new mockUserModel(prod);
    const savedProd = await newProd.save();

    expect(service.createProduct(prod)).toEqual(service.mapProductToDTO(savedProd, new ProductDTO()));

  })
*/

