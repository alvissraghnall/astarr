import { Controller, Post, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { CurrentUser } from '@auth/decorator/current-user.decorator';
import { User, UserDocument } from '@user/user.schema';

@Controller('/favorites')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post('/:productId')
  async addFavouriteProduct(@CurrentUser() user: UserDocument, @Param('productId') productId: string) {
    const userId = user.id; 
    return this.favouriteService.addFavouriteProduct(userId, productId);
  }

  @Get()
  async getUserFavouriteProducts(@CurrentUser() user: UserDocument) {
    const userId = user.id;
    return this.favouriteService.getUserFavouriteProducts(userId);
  }

  @Delete('/:productId')
  async removeFavouriteProduct(@CurrentUser() user: UserDocument, @Param('productId') productId: string) {
    const userId = user.id;
    return this.favouriteService.removeFavouriteProduct(userId, productId);
  }
}
