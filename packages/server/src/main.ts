import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '~modules/App/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        allowedHeaders: ['GET', 'POST', 'DELETE', 'PATCH'],
        credentials: true,
    });

    app.set('query parser', 'extended');

    await app.listen(4000);
}

bootstrap();
