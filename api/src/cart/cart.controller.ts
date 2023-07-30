import { Body, Controller, HttpCode, UseGuards, HttpStatus, Post, Put, Req, BadRequestException, Param, Delete, Get, NotFoundException, ForbiddenException } from '@nestjs/common';
import type { Request } from 'express';
import { Role } from '@auth/decorator/role.decorator';
import { RoleGuard } from '@auth/guard/role.guard';
import { CartDTO } from './cart.dto';
import { Role as UserRole } from 'src/user/user-role';
import { CartService } from './cart.service';
import { VerifyUserIdGuard } from 'src/auth/guard/verify-user-id.guard';
import { ObjectId } from 'mongoose';
import { CurrentUser } from '@auth/decorator/current-user.decorator';
import { UserDocument, User } from 'src/user/user.schema';
import { CartObjectDTO } from './cart-object.dto';


@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService,
        // @CurrentUser() private readonly currUser: User
    ) {}

    @Post("")
    @HttpCode(HttpStatus.CREATED)
    async createCart (@Body() cartDTO: CartDTO) {
        return await this.cartService.create(cartDTO)
            .catch(err => {
                if (err.code == 11000) {
                    throw new BadRequestException(`User already has existing cart!`);
                }
            });;
    }

    @Get("/:id")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getProducts (@Param("id") id: string) {
        const cart = await this.cartService.get(id);
        
        return cart;
    }

    @Get("/user")
    @HttpCode(HttpStatus.OK)
    async getCartForUser (@CurrentUser() user : UserDocument) {
        return  this.cartService.getCartForUser(user.id ?? user._id.toString());
    }

    @Get("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @HttpCode(HttpStatus.OK)
    async getCarts () {
        return await this.cartService.getAll();
    }


    @Put('/:cartId')
    async updateCart (@Param("cartId") cartId: string, @Body() cartDTO: Partial<CartDTO>, @CurrentUser() user : UserDocument ) {
        const cart = await this.cartService.get(cartId, true);

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
    
        if (cart.userId !== user.id) {
            throw new ForbiddenException('You are not authorized to update this cart');
        }

        return await this.cartService.update(cart, cartDTO);
    }

    @Delete(":id")
    @UseGuards(VerifyUserIdGuard)
    async deleteProduct (@Param("id") id: string ): Promise<{ message: string; }> {
        await this.cartService.remove(id);
        return {
            message: "Cart successfully deleted!"
        }
    }


}
