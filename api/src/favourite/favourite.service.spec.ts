import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteService } from './favourite.service';
import { FavouriteRepository } from './favourite.repository';
import { NotFoundException } from '@nestjs/common';

describe('FavouriteService', () => {
  let favouriteService: FavouriteService;
  let favouriteRepository = {
    addFavouriteProduct: jest.fn(),
    getUserFavouriteProducts: jest.fn(),
    removeFavouriteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavouriteService,
        {
          provide: FavouriteRepository,
          useValue: favouriteRepository
        },
      ],
    }).compile();

    favouriteService = module.get<FavouriteService>(FavouriteService);
    // favouriteRepository = module.get<FavouriteRepository>(FavouriteRepository);
  });

  it('should be defined', () => {
    expect(favouriteService).toBeDefined();
  });

  describe('addFavouriteProduct', () => {
    it('should add a product to favourites', async () => {
      const userId = 'user-id';
      const productId = 'product-id';

      favouriteRepository.addFavouriteProduct.mockResolvedValue({ _id: userId, favourites: [] });

      const result = await favouriteService.addFavouriteProduct(userId, productId);

      expect(result.favourites).toContain(productId);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = 'user-id';
      const productId = 'product-id';

      favouriteRepository.addFavouriteProduct.mockRejectedValue(new NotFoundException());

      await expect(favouriteService.addFavouriteProduct(userId, productId)).rejects.toThrowError(
        NotFoundException,
      );
    });

    // Add more test cases for other methods (getUserFavouriteProducts, removeFavouriteProduct, etc.)
  });
});
