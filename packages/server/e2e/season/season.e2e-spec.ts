import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { SeasonModule } from '~modules/Season/season.module';

import { Season } from '~entities/Season/Season.entity';

import { SeasonsMock } from '~modules/Season/__tests__/mock/season.mock';

describe('Season e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                SeasonModule,
                ...TestDbConnection([
                    {
                        entitySchema: Season,
                        data: SeasonsMock,
                    },
                ]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/season (GET)', () => {
        return request(app.getHttpServer()).get('/season').expect(200).expect({
            data: SeasonsMock,
            count: SeasonsMock.length,
        });
    });

    it('/season with pagination (GET)', () => {
        return request(app.getHttpServer())
            .get('/season')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({ data: [SeasonsMock[0]], count: SeasonsMock.length });
    });

    it('/season/:year (GET, 200)', () => {
        const entity = SeasonsMock[0];

        return request(app.getHttpServer())
            .get(`/season/${entity.year}`)
            .expect(200)
            .expect(entity);
    });

    it('/season/:not-existed-year (GET, 404)', () => {
        return request(app.getHttpServer()).get('/season/not-found-season').expect(404);
    });
});
