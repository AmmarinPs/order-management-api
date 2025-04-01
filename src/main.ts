import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ลบ property ที่ไม่ได้กำหนดใน DTO
      transform: true, // แปลงข้อมูลให้ตรงกับ type ใน DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API for managing orders, payments, and webhooks')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();