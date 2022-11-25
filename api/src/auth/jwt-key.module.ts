import { Module } from "@nestjs/common";
import { JwtKeyService } from "./jwt-keys";

@Module({
    providers: [JwtKeyService],
    exports: [JwtKeyService]
})
export class JwtKeyModule {}