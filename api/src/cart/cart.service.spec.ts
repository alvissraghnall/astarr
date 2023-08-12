import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { ProductModule } from '@product/product.module';
import { ProductService } from '@product/product.service';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, ProductService],
      // imports: [ProductModule]
    }).compile();

    cartService = module.get<CartService>(CartService);
  });

  describe('removeItem', () => {
    it('should remove an item from the user\'s cart', async () => {
      const mockCart = {
        products: [
          { product: 'product1', quantity: 2 },
          { product: 'product2', quantity: 3 },
        ],
        save: jest.fn(),
      };
      const mockUser = { id: 'userId' } as any;
      
      // Mock the getCartForUser method to return the mockCart
      cartService.getCartForUser = jest.fn().mockResolvedValue(mockCart);

      // Mock the save method to return the modified cart
      mockCart.save.mockResolvedValue(mockCart);

      const result = await cartService.removeItem('product1', mockUser);

      expect(result.products).toHaveLength(1);
      expect(result.products[0].product).toBe('product2');
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
