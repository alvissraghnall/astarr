console.time("nest common");
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
console.timeEnd("nest common");
console.time("nest core");
import { NestFactory, Reflector } from '@nestjs/core';
console.timeEnd("nest core");
console.time("app module");
import { AppModule } from './app.module';
console.timeEnd("app module");
console.time("auth guard");
import { JwtAuthGuard } from './auth/guard/auth.guard';
console.timeEnd("auth guard");
console.time("swagger");
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
console.timeEnd("swagger");

async function bootstrap() {
  console.time("boot");
  const app = await NestFactory.create(AppModule);
  console.timeLog("boot");
  const reflector = app.get(Reflector);
  console.timeLog("boot");
  app.enableCors();
  console.timeLog("boot");
  app.setGlobalPrefix("/api/v1");
  console.timeLog("boot");
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  console.timeLog("boot");
  app.useGlobalPipes(new ValidationPipe());
  console.timeLog("boot");
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const config = new DocumentBuilder()
    .setTitle("ecommerce API")
    .setDescription("eCommerce API Schema, as built with NestJS & Mongoose.")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("ecommerce")
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  await app.listen(3000);

  console.log(await app.getUrl());
  console.timeEnd("boot");
}

bootstrap();
