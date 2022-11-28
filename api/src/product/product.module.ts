import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PassportModule } from '@nestjs/passport';
import { Product, ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
   
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
