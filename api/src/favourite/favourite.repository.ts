import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulatedDoc, Types } from 'mongoose';
import { User } from '@user/user.schema';
import { Product } from '@product/product.schema';

@Injectable()
export class FavouriteRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async addFavouriteProduct(userId: string, productId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favourites.push(productId);
    await user.save();
    return user;
  }

  async getUserFavouriteProducts(userId: string) {
    const user = await this.userModel.findById(userId).populate('favourites').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.favourites;
  }

  async removeFavouriteProduct(userId: string, productId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favourites = user.favourites.filter(id => id.toString() !== productId);
    return await user.save();
  }
}
