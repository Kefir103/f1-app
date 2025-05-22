import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { Circuit } from '~entities/Public/Circuit/Circuit.entity';
import { CircuitModule } from '~modules/Circuit/circuit.module';

import { CircuitMocks } from '~modules/Circuit/__tests__/mocks/Circuit.mock';

describe('Circuit e2e', () => {
    let app: NestExpressApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CircuitModule,
                ...TestDbConnection([{ entitySchema: Circuit, data: CircuitMocks }]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.set('query parser', 'extended');

        await app.init();
    });

    it('/circuit (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/circuit')
            .expect(200)
            .expect({ data: CircuitMocks, count: CircuitMocks.length });
    });

    it('/circuit with pagination (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/circuit')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({ data: [CircuitMocks[0]], count: CircuitMocks.length });
    });

    it('/circuit with pagination and filters (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/circuit')
            .query({
                page: 1,
                perPage: 10,
                filter: {
                    id: CircuitMocks[1].id,
                },
            })
            .expect(200)
            .expect({
                data: [CircuitMocks[1]],
                count: 1,
            });
    });

    it('/circuit/:ref (GET, 200)', () => {
        const entity = CircuitMocks[0];

        return request(app.getHttpServer())
            .get(`/circuit/${entity.ref}`)
            .expect(200)
            .expect(entity);
    });

    it('/circuit/:not-existed-ref (GET, 404)', () => {
        return request(app.getHttpServer()).get('/circuit/not-found-ref').expect(404);
    });
});
