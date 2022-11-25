import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Types, Document } from 'mongoose';
import { HashService } from 'src/user/password-hash.service';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

export type UserEntity = User & Document<any, any, any> & {
    _id: Types.ObjectId;
}

export type Payload = {
  username: string,
  email?: string,
  sub: string
};

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private hashService: HashService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise < any > {
        const user = await this.userService.getUserByUsername(username);
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
          const { password, ..._rest } = user;
          return _rest;
        }
        return null;
    }

    async validateUserPayload (payload: Payload) {
      const user = await this.userService.getByPayload(payload);
      if (!user) throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED);

      return user;
    }

    async login(user: any, signOptions: JwtSignOptions = {}) {
      console.log(user);
      const payload = {
        username: user.username,
        sub: user.id
      };
      console.log(payload);
      return {
        access_token: this.jwtService.sign(payload, signOptions),
      };
    }


}
