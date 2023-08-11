import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PassportModule } from '@nestjs/passport';
import { Cart, CartSchema } from "./cart.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@/product/product.module';
import { ProductService } from '@product/product.service';
import { UserService } from '@user/user.service';
import { CartObjectSchema } from './cart-object.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      // { name: "CartObject", schema: CartObjectSchema },
    ]),
    ProductModule,
  ],
  providers: [CartService, ProductService],
  exports: [CartService, MongooseModule, ProductModule],
  controllers: [CartController]
})
export class CartModule {}
