import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config"
import { UserModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { StripeModule } from './stripe/stripe.module';
import { FavouriteModule } from './favourite/favourite.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.production'],
    }), 
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    ProductModule,
    CartModule, 
    OrderModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    StripeModule,
    FavouriteModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
