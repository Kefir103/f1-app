import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';

import { AppModule } from '~modules/App/app.module';
import { PaginationMiddleware } from '~middlewares/pagination/Pagination.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        allowedHeaders: ['GET', 'POST', 'DELETE', 'PATCH'],
        credentials: true,
    });
    app.use(PaginationMiddleware);

    await app.listen(4000);
}

bootstrap();
