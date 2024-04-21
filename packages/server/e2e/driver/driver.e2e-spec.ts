import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';

import { DriverModule } from '~modules/Driver/driver.module';

import { Driver } from '~entities/Driver/Driver.entity';
import { Result } from '~entities/Result/Result.entity';
import { Qualifying } from '~entities/Qualifying/Qualifying.entity';

import {
    DriverMocks,
    DriverQualifyingMock,
    DriverResultsMock,
} from '~modules/Driver/__tests__/mocks/Driver.mock';

function formatDriverResponse(driver: DriverType) {
    return {
        ...driver,
        date_of_birth: moment(driver.date_of_birth).format('YYYY-MM-DD'),
    };
}

describe('Driver e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                DriverModule,
                ...TestDbConnection([
                    {
                        entitySchema: Driver,
                        data: DriverMocks,
                    },
                    {
                        entitySchema: Result,
                        data: DriverResultsMock,
                    },
                    {
                        entitySchema: Qualifying,
                        data: DriverQualifyingMock,
                    },
                ]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/driver (GET)', () => {
        return request(app.getHttpServer())
            .get('/driver')
            .expect(200)
            .expect({
                data: DriverMocks.map(formatDriverResponse),
                count: DriverMocks.length,
            });
    });

    it('/driver with pagination (GET)', () => {
        return request(app.getHttpServer())
            .get('/driver')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({ data: [formatDriverResponse(DriverMocks[0])], count: DriverMocks.length });
    });

    it('/driver/:ref (GET, 200)', () => {
        const entity = formatDriverResponse(DriverMocks[0]);

        return request(app.getHttpServer()).get(`/driver/${entity.ref}`).expect(200).expect(entity);
    });

    it('/driver/:not-existed-ref (GET, 404)', () => {
        return request(app.getHttpServer()).get('/driver/not-found-ref').expect(404);
    });
});
