import { Controller, Post, Put, Req } from '@nestjs/common';
import type { Request } from 'express';
import { brotliDecompressSync } from 'zlib';


@Controller('cart')
export class CartController {

    @Post("")
    async createCart (@Req() req: Request) {
        
    }

}
