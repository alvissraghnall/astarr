import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';

describe('FavouriteController', () => {
  let favouriteController: FavouriteController;
  let favouriteService: FavouriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavouriteController],
      providers: [
        {
          provide: FavouriteService,
          useValue: {
            addFavoriteProduct: jest.fn(),
            getUserFavoriteProducts: jest.fn(),
            removeFavoriteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    favouriteController = module.get<FavouriteController>(FavouriteController);
    favouriteService = module.get<FavouriteService>(FavouriteService);
  });

  it('should be defined', () => {
    expect(favouriteController).toBeDefined();
  });

  describe('addFavoriteProduct', () => {
    it('should add a product to favorites', async () => {
      const userId = 'user-id';
      const productId = 'product-id';

      // spy !!
      favouriteService.addFavoriteProduct.mockResolvedValue({ _id: userId, favorites: [] });

      const result = await favouriteController.addFavoriteProduct({ user: { userId } }, productId);

      expect(result.favorites).toContain(productId);
    });

    // Add more test cases for other controller methods
  });
});
