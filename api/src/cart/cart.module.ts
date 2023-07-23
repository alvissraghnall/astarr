import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PassportModule } from '@nestjs/passport';
import { Cart, CartSchema } from "./cart.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@/product/product.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductModule,
  ],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
