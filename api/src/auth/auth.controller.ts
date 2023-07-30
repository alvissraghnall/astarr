import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Request, UseInterceptors } from '@nestjs/common';
import { UserDTO, UserWithoutPassword } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtKeyService } from './jwt-keys';
import { UserLoginPayload } from './payload/login.payload';
import { Public } from './decorator/public.decorator';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from '@/user/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, 
        private readonly jwtKeyService: JwtKeyService
    ) {}

    
    @Public()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login (@Body() user: UserLoginPayload) {
        console.log(user);
        return this.authService.login(user, {
            algorithm: "RS256",
            privateKey: await this.jwtKeyService.getPrivKey(),
            expiresIn: "10d"
        });
    }

    
    @Public()
    @Post("create")
    async create (@Body() createUser: UserDTO) {
        
        return this.authService.register(createUser);
    }

    @Get("whoami")
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOkResponse({
        description: 'Return current user',
        content: {
            'application/json': {
                schema: {
                  type: 'object',
                },
            },
        }
    })
    @ApiUnauthorizedResponse({
        description: 'User unauthorized',
        
    })
    async whoAmI (
        @CurrentUser() currUser: User
    ) {
        return currUser;
    }
}
