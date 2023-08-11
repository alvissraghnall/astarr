
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { plainToInstance } from "class-transformer";
import { map } from "rxjs";

@Injectable()
export class ClassTransformInterceptor<T> implements NestInterceptor {
    constructor(private readonly targetClass: ClassConstructor<T>) {}

    intercept(ctx: ExecutionContext, handler: CallHandler) {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.targetClass, data, {
                    excludeExtraneousValues: true
                });
            })
        );
    }
}
