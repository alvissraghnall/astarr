import { BadRequestException, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PassportModule } from '@nestjs/passport';
import { Product, ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeatureAsync([
      { 
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          schema.post('save', (error, doc, next) => {
            if (error.keyValue.title != null && error.name === "MongoError" && error.code === 11000) {
              console.log("title must be unique");
              next(new BadRequestException('title already exists, please try another'));
            } else if (error.keyValue.desc != null && error.name === "MongoError" && error.code === 11000) {
              console.log("desc must be unique");
              next(new BadRequestException('desc must be unique!'));
            } else {
              console.log("not found any idea, search for another reasons");
              next(error);
            }
          });
          return schema;
        }
      }
    ]),
   
  ],
  providers: [ProductService],
  exports: [ProductService, MongooseModule],
  controllers: [ProductController]
})
export class ProductModule {}
