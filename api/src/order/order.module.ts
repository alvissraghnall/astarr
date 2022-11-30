import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PassportModule } from '@nestjs/passport';
import { Order } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from 'src/cart/cart.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Order.name, schema: CartSchema }]),
   
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
