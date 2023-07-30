import { BadRequestException, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from './user.schema';
import { HashService } from './password-hash.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtKeyService } from 'src/auth/jwt-keys';
import { PassportModule } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { AuthModule } from 'src/auth/auth.module';
import { UserStatsController } from './user-stats.controller';
import { CartModule } from '@/cart/cart.module';
import { CartService } from '@cart/cart.service';

@Module({
  providers: [UserService, CartService, HashService, AuthService, JwtStrategy, LocalStrategy, ConfigService, RoleGuard, JwtKeyService],
  controllers: [UserController, UserStatsController],
  imports: [
    MongooseModule.forFeatureAsync([
      { 
        name: User.name, 
        useFactory: () => {
          const schema = UserSchema;
          schema.post('save', (error, doc, next) => {
            if (error.keyValue.email != null && error.name === "MongoError" && error.code === 11000) {
              console.log("Email must be unique");
              next(new BadRequestException('Email already exists, please try another'));
            } else if (error.keyValue.username != null && error.name === "MongoError" && error.code === 11000) {
              console.log("Username must be unique");
              next(new BadRequestException('Username already in use, please try another'));
            } else {
              console.log("not found any idea, search for another reasons");
              next(error);
            }
          });
          return schema;
        }
      }
    ]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // CartModule
  ],
  exports: [MongooseModule, UserService]
})
export class UserModule {}
