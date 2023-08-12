import { Body, Query, Controller, HttpCode, UseGuards, HttpStatus, Post, Put, Req, BadRequestException, Param, Delete, Get, NotFoundException, ForbiddenException, UseInterceptors } from '@nestjs/common';
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
import { CartObjectRequestDTO } from './cart-object.dto';
import { ClassTransformInterceptor } from '@/common/interceptor/class-transform.interceptor';
import { ProductDTO } from '@product/product.dto';


@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService,
        // @CurrentUser() private readonly currUser: User
    ) {}

    @Post("")
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(new ClassTransformInterceptor(CartDTO))
    async createCart (
        @Body() cartDTO: CartDTO,
        @CurrentUser() user: UserDocument
    ) {
        cartDTO.userId = user.id;
        return await this.cartService.create(cartDTO)
            .catch(err => {
                if (err.code == 11000) {
                    throw new BadRequestException(`User already has existing cart!`);
                }
            });;
    }

    // @Get("/:id")
    // @UseGuards(RoleGuard)
    // @Role(UserRole.ADMIN)
    // @UseInterceptors(new ClassTransformInterceptor(CartDTO))
    // @HttpCode(HttpStatus.OK)
    // async getCart (@Param("id") id: string) {
    //     const cart = await this.cartService.get(id);
        
    //     return cart;
    // }

    @Get("/user")
    @UseInterceptors(new ClassTransformInterceptor(CartDTO))
    @HttpCode(HttpStatus.OK)
    async getCartForUser (@CurrentUser() user : UserDocument) {
        console.log("f:: \n", user._id.toString());
        return this.cartService.getCartForUser(user._id.toString());
    }

    @Get("")
    @UseGuards(RoleGuard)
    @Role(UserRole.ADMIN)
    @UseInterceptors(new ClassTransformInterceptor(CartDTO))
    @HttpCode(HttpStatus.OK)
    async getCarts () {
        return await this.cartService.getAll();
    }


    @Put('/:cartId')
    @UseInterceptors(new ClassTransformInterceptor(CartDTO))
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

    @Delete("/user")
    async deleteCart (@CurrentUser() user : UserDocument ): Promise<{ message: string; }> {
        await this.cartService.remove(user._id.toString());
        return {
            message: "Cart successfully deleted!"
        }
    }

    @Post("/add-item")
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new ClassTransformInterceptor(CartDTO))
    async addProductToCart (
        @Body() productDTO: CartObjectRequestDTO,
        @CurrentUser() user: UserDocument
    ) {
        return await this.cartService.addItem(
            productDTO, user
        );
    }

    @Put("/remove-item/:productId")
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseInterceptors(new ClassTransformInterceptor(CartDTO))
    async removeProductFromCart (
        @Param("productId") productId: string,
        @CurrentUser() user: UserDocument,
        @Query('quantity') quantity: number,
    ) {
        const updatedCart = await this.cartService.removeItem(
            productId, user, quantity
        );

        return updatedCart;
    }


}
