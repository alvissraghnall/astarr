import { BadRequestException, Body, Controller, HttpCode, HttpException, HttpStatus, Post, Request } from '@nestjs/common';
import { UserDTO, UserWithoutPassword } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtKeyService } from './jwt-keys';
import { UserLoginPayload } from './payload/login.payload';
import { Public } from './decorator/public.decorator';

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
        const userInDb = await this.userService.getUserByUsername(user.username);

        if (!userInDb || !await this.authService.validateUser(user.username, user.password)) throw new HttpException("Username or password provided incorrect.", HttpStatus.BAD_REQUEST);

        return this.authService.login(userInDb, {
            algorithm: "RS256",
            privateKey: await this.jwtKeyService.getPrivKey(),
            expiresIn: "10d"
        });
    }

    
    @Public()
    @Post("create")
    async create (@Body() createUser: UserDTO) {
        
        const newUser = await this.userService.create(createUser);
        const userTransport = this.userService.mapUserToDTOWithoutPassword(newUser, new UserWithoutPassword());
        // const { password, ...others } = newUser.toJSON();
        return userTransport;
    }
}
