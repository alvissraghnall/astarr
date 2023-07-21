import { Module } from '@nestjs/common';
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

@Module({
  providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy, ConfigService, RoleGuard, JwtKeyService],
  controllers: [UserController, UserStatsController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CartModule
  ],
  exports: [MongooseModule]
})
export class UserModule {}
