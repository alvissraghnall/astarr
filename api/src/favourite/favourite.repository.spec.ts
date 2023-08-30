import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteRepository } from './favourite.repository';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

describe('FavouriteRepository', () => {
  let favouriteRepository: FavouriteRepository;

  const mockUserModel = {
    findById: jest.fn(),
  };

  const mockProductModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavouriteRepository,
        {
          provide: getModelToken('User'), // Match with the model name in InjectModel
          useValue: mockUserModel,
        },
        {
          provide: getModelToken('Product'), // Match with the model name in InjectModel
          useValue: mockProductModel,
        },
      ],
    }).compile();

    favouriteRepository = module.get<FavouriteRepository>(FavouriteRepository);
  });

  it('should be defined', () => {
    expect(favouriteRepository).toBeDefined();
  });

  describe('addFavouriteProduct', () => {
    it('should add a product to favourites', async () => {
      const userId = 'user-id';
      const productId = 'product-id';
      const mockUser = { _id: userId, favouriteProducts: [] };
      const mockProduct = { _id: productId };

      mockUserModel.findById.mockResolvedValue(mockUser);
      mockProductModel.findById.mockResolvedValue(mockProduct);

      const result = await favouriteRepository.addFavouriteProduct(userId, productId);

      expect(result.favourites).toContain(productId);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = 'user-id';
      const productId = 'product-id';

      mockUserModel.findById.mockResolvedValue(null);

      await expect(favouriteRepository.addFavouriteProduct(userId, productId)).rejects.toThrowError(
        NotFoundException,
      );
    });

    // Add more test cases for other methods (getUserFavouriteProducts, removeFavouriteProduct, etc.)
  });
});
