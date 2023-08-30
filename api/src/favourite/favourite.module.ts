import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { FavouriteRepository } from './favourite.repository';

@Module({
  controllers: [FavouriteController],
  providers: [FavouriteService, FavouriteRepository]
})
export class FavouriteModule {}
