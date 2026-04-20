import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
     app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strips unknown fields
      forbidNonWhitelisted: true, // throws error on unknown fields
      transform: true,        // auto transforms types
    }),
  );
   app.enableCors({
    origin: '*', // change to frontend URL in production
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}/api/v1`);

}
bootstrap();
