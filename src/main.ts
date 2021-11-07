import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { doc } from 'prettier';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Api document
  const options = new DocumentBuilder()
  .setTitle('User Api')
  .setDescription('User Crud Operations')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)

  app.enableCors({
    origin: [
      'http://localhost:4200', 
      'http://localhost:3000', 
      'http://localhost:8081', 
    ],
  });
  await app.listen(3000);
}
bootstrap();
