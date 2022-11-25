import { BadRequestException, Body, Controller, HttpCode, HttpException, HttpStatus, Post, Request } from '@nestjs/common';
import { UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtKeyService } from './jwt-keys';
import { UserLoginPayload } from './login.payload';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, 
        private readonly userService: UserService,
        private readonly jwtKeyService: JwtKeyService
        ) {}

    
    @Public()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login (@Body() user: UserLoginPayload) {
        console.log(user);
        const userInDb = this.userService.getUserByUsername(user.username);

        if (!userInDb || !await this.authService.validateUser(user.username, user.password)) throw new HttpException("Username or password provided incorrect.", HttpStatus.BAD_REQUEST);

        return this.authService.login(userInDb, {
            algorithm: "RS256",
            privateKey: await this.jwtKeyService.getPrivKey(),

        });
    }

    
    @Public()
    @Post("create")
    async create (@Body() createUser: UserDTO) {
        
        const newUser = await this.userService.create(createUser);
        const { password, ...others } = newUser;
        return others;
    }
}
