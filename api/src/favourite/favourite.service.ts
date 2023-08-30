import { Injectable } from '@nestjs/common';
import { FavouriteRepository } from './favourite.repository';
import { User } from '@user/user.schema';

@Injectable()
export class FavouriteService {
  constructor(private readonly favouriteProductRepository: FavouriteRepository) {}

  async addFavouriteProduct(userId: string, productId: string): Promise<User> {
    return this.favouriteProductRepository.addFavouriteProduct(userId, productId);
  }

  async getUserFavouriteProducts(userId: string) {
    return this.favouriteProductRepository.getUserFavouriteProducts(userId);
  }

  async removeFavouriteProduct(userId: string, productId: string): Promise<void> {
    this.favouriteProductRepository.removeFavouriteProduct(userId, productId);
    
  }
}
