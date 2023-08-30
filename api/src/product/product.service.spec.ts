import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductDTO } from './product.dto';
import { ProductSize } from './product-size';
import { Types } from 'mongoose';

describe('ProductService', () => {
  let productService: ProductService;
  let mockProductDTO: ProductDTO;

  const mockProductRepository = {
    createProduct: jest.fn(),
    getProductById: jest.fn(),
    // Add other mock methods as needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    mockProductDTO = {
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
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      
      const mockProduct = { ...mockProductDTO, _id: 'some-unique-id' };
      mockProductRepository.createProduct.mockReturnValue(mockProduct);

      const result = await productService.createProduct(mockProductDTO);

      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.createProduct).toHaveBeenCalledWith(mockProductDTO);
    });
  });

  // Add more test cases for other methods (getProduct, getProducts, deleteProduct, etc.)
});
