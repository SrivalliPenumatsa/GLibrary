import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,JwtToken',
    exposedHeaders: 'Authorization,JwtToken',
    credentials: true,
    preflightContinue: false,
  });
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,JwtToken');
      res.status(200).end();
      return;
    }
    next();
  });

  const config = new DocumentBuilder()
  .setTitle('Book Hub ')
  .setDescription('Your API description')
  .setVersion('1.0')
  .addTag('Your API Tag')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('bookHub', app, document);
  //http://localhost:3001/bookHub
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
