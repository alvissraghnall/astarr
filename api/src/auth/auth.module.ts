import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { HashService } from 'src/user/password-hash.service';
import { UserService } from 'src/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtKeyService } from './jwt-keys';
import { JwtKeyModule } from './jwt-key.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { RoleGuard } from './guard/role.guard';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    PassportModule.register({ defaultStrategy: 'jwt', property: "user" }), JwtModule.registerAsync({
      imports: [ConfigModule, JwtKeyModule],
      useFactory: async (configService: ConfigService, keyService: JwtKeyService) => {
        return {
          privateKey: await keyService.getPrivKey(),
          publicKey: await keyService.getPubKey(), 
          signOptions: { expiresIn: '10d', algorithm: 'RS256', iss: "astarr." },
        };
      },
      
      inject: [ConfigService, JwtKeyService]
  })],
  providers: [AuthService, JwtKeyService, LocalStrategy, JwtStrategy, HashService, JwtService, UserService, ConfigService, RoleGuard],
  exports: [AuthService, JwtStrategy, LocalStrategy, JwtModule, PassportModule],
  controllers: [AuthController]
})
export class AuthModule {}
