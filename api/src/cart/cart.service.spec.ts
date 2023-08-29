import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { ProductModule } from '@product/product.module';
import { ProductService } from '@product/product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cart } from './cart.schema';

describe('CartService', () => {
  let cartService: CartService;

  const productServiceMock = {
    // Mock the methods that CartService uses from ProductService
    getProduct: jest.fn(),
  };

  const mockProduct = {
    _id: 'product1',
    title: 'Mock Product',
    // ... other properties of a Product
  };

  const cartModelMock = {
    // Mock the methods that CartService uses from CartModel
    findOne: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    // ... other methods used by CartService
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService,
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
        {
          provide: getModelToken(Cart.name), // Use getModelToken to get the token for CartModel
          useValue: cartModelMock,
        },
      ],
      // imports: [ProductModule]
    }).compile();

    cartService = module.get<CartService>(CartService);
  });

  describe('removeItem', () => {
    it('should remove an item from the user\'s cart', async () => {
      productServiceMock.getProduct.mockResolvedValue(mockProduct);

      cartModelMock.findOne.mockResolvedValue({
        products: [
          { product: 'product1', quantity: 2 },
          { product: 'product2', quantity: 3 },
        ],
        save: jest.fn(),
      });

      const mockCart = {
        products: [
          { product: 'product1', quantity: 2 },
          { product: 'product2', quantity: 3 },
        ],
        save: jest.fn(),
      };

       // Mock the findById method to return the same cart
      cartModelMock.findById.mockResolvedValue({
        ...cartModelMock.findOne.mock.results[0]?.value,
      });
      console.log(cartModelMock.findOne.mock.results);

      const mockUser = { id: 'userId' } as any;

      const result = await cartService.removeItem('product1', mockUser);

      expect(result.products).toHaveLength(1);
      expect(result.products[0].product).toBe('product2');

      // Check if the findOne and findById methods were called
      expect(cartModelMock.findOne).toHaveBeenCalledWith({ userId: 'userId' });
      expect(cartModelMock.findById).toHaveBeenCalledWith(result._id);

      // Mock the getCartForUser method to return the mockCart
      cartService.getCartForUser = jest.fn().mockResolvedValue(mockCart);

      // Mock the save method to return the modified cart
      cartModelMock.save.mockResolvedValue(mockCart);

      expect(result.products).toHaveLength(1);
      expect(result.products[0].product).toBe('product2');
      expect(productServiceMock.getProduct).toHaveBeenCalledWith('product1');
  
    });

    it('should reduce the quantity of an item in the user\'s cart', async () => {
      const mockCart = {
        products: [{ product: 'product1', quantity: 3 }],
        save: jest.fn(),
      };
      const mockUser = { id: 'userId' } as any;

      cartService.getCartForUser = jest.fn().mockResolvedValue(mockCart);

      mockCart.save.mockResolvedValue(mockCart);

      const result = await cartService.removeItem('product1', mockUser, 2);

      expect(result.products[0].quantity).toBe(1);
    });

    it('should remove the item when quantity to remove is greater than or equal to item quantity', async () => {
      const mockCart = {
        products: [{ product: 'product1', quantity: 3 }],
        save: jest.fn(),
      };
      const mockUser = { id: 'userId' } as any;

      cartService.getCartForUser = jest.fn().mockResolvedValue(mockCart);

      mockCart.save.mockResolvedValue(mockCart);

      const result = await cartService.removeItem('product1', mockUser, 3);

      expect(result.products).toHaveLength(0);
    });

    it('should throw NotFoundException if the item is not in the cart', async () => {
      const mockCart = {
        products: [],
      };
      const mockUser = { id: 'userId' } as any;

      cartService.getCartForUser = jest.fn().mockResolvedValue(mockCart);

      await expect(cartService.removeItem('nonExistingProduct', mockUser)).rejects.toThrowError(NotFoundException);
    });
  });
});
