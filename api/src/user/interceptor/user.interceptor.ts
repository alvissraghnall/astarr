import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UserWithoutPassword } from "@user/user.dto";
import { plainToInstance } from "class-transformer";
import { map } from "rxjs";


@Injectable()
export class UserInterceptor implements NestInterceptor {
 
    intercept (ctx: ExecutionContext, handler: CallHandler) {
        return handler.handle().pipe(
            map((data: any) => {
                
                return plainToInstance(UserWithoutPassword, data, {
                    
                });
            })
        )
    }
}