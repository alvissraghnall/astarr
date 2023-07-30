import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ProductSize } from './product-size';
import { promisify } from 'util';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('ProductService', () => {
  let productService: ProductService;
  let productModel: Model<ProductDocument>;
  const { ObjectId } = Types;
  let productDTO: ProductDTO;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        // Conn
        // {
        //   provide: getModelToken(Product.name), // Mock the Mongoose model injection
        //   useValue: {
        //     new: jest.fn().mockResolvedValue(new Product()), // Mock the model instance
        //     create: jest.fn().mockResolvedValue(new Product()), // Mock the model instance
        //     findById: jest.fn().mockResolvedValue(new Product()),
        //     find: jest.fn().mockResolvedValue([new Product()]),
        //     findByIdAndDelete: jest.fn().mockResolvedValue(new Product()),
        //     findByIdAndUpdate: jest.fn().mockResolvedValue(new Product()),
        //     findOneAndReplace: jest.fn().mockResolvedValue(new Product()),
        //   },
        // },
      ],
      imports: [
        MongooseModule.forRoot(mongoUri, {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      ],
    }).compile();
    productDTO = {
      title: 'Test Product',
      desc: 'Test Product Description',
      image: 'test_image.jpg',
      category: 'Test Category',
      sizes: [ProductSize.MEDIUM],
      colors: ['red', 'blue'],
      price: 100,
      rating: 4.5,
      discountIsActive: true,
      inStock: true,
      // id: new ObjectId().toHexString(), // The id is not set by the user in real-world usage, but we include it here for testing purposes.
      createdAt: new Date(),
      updatedAt: new Date()
    };
    productService = module.get<ProductService>(ProductService);
    productModel = module.get<Model<ProductDocument>>(getModelToken(Product.name));
  });
  
  afterAll(async () => {

    await mongod.stop();
  });

  // Test for createProduct method
  it('should create a new product', async () => {
    

    const newProd = await productModel.create(productDTO);
    // const spy = jest.spyOn(newProd, "save").mockResolvedValue(productDTO as ProductDocument & { _id: typeof ObjectId })
    const savedProd = await newProd.save();
    const createdProduct: ProductDTO = await productService.createProduct(productDTO);
    expect(createdProduct.title).toBe(productDTO.title);
    expect(createdProduct.price).toBe(productDTO.price);
    expect(createdProduct.category).toBe(productDTO.category);
    expect(productService.createProduct(productDTO)).toEqual(productService.mapProductToDTO(savedProd, new ProductDTO()));
    // expect(spy).toBeCalledTimes(2);
  });

  // Test for getProduct method
  it('should get a product by id', async () => {
    const productId = new ObjectId()._id.toHexString();

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

