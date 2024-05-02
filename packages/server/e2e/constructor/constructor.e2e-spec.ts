import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { Constructor } from '~entities/Constructor/Constructor.entity';
import { ConstructorModule } from '~modules/Constructor/constructor.module';

import { ConstructorsMock } from '~modules/Constructor/__tests__/mock/Constructor.mock';

describe('Constructor e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConstructorModule,
                ...TestDbConnection([
                    {
                        entitySchema: Constructor,
                        data: ConstructorsMock,
                    },
                ]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/constructor (GET)', () => {
        return request(app.getHttpServer()).get('/constructor').expect(200).expect({
            data: ConstructorsMock,
            count: ConstructorsMock.length,
        });
    });

    it('/constructor with pagination (GET)', () => {
        return request(app.getHttpServer())
            .get('/constructor')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({ data: [ConstructorsMock[0]], count: ConstructorsMock.length });
    });

    it('/constructor/:ref (GET, 200)', () => {
        const entity = ConstructorsMock[0];

        return request(app.getHttpServer())
            .get(`/constructor/${entity.ref}`)
            .expect(200)
            .expect(entity);
    });

    it('/constructor/:not-existed-ref (GET, 404)', () => {
        return request(app.getHttpServer()).get('/constructor/not-found-ref').expect(404);
    });
});
