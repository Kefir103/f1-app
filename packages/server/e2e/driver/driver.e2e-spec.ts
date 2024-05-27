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
import { Race } from '~entities/Race/Race.entity';
import { Circuit } from '~entities/Circuit/Circuit.entity';
import { Constructor } from '~entities/Constructor/Constructor.entity';
import { Status } from '~entities/Status/Status.entity';
import { Season } from '~entities/Season/Season.entity';

import {
    DriverCircuitsMock,
    DriverMocks,
    DriverQualifyingMock,
    DriverRacesMock,
    DriverResultsMock,
    DriverConstructorMock,
    DriverStatusesMock,
    DriverSeasonsMock,
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
                    {
                        entitySchema: Race,
                        data: DriverRacesMock,
                    },
                    {
                        entitySchema: Circuit,
                        data: DriverCircuitsMock,
                    },
                    {
                        entitySchema: Constructor,
                        data: DriverConstructorMock,
                    },
                    {
                        entitySchema: Status,
                        data: DriverStatusesMock,
                    },
                    {
                        entitySchema: Season,
                        data: DriverSeasonsMock,
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
                data: DriverMocks.map(formatDriverResponse).map((driver) => ({
                    ...driver,
                    constructor_entity: DriverConstructorMock.find(
                        (constructor) => constructor.id === driver.constructor_id,
                    ),
                })),
                count: DriverMocks.length,
            });
    });

    it('/driver with pagination (GET)', () => {
        return request(app.getHttpServer())
            .get('/driver')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({
                data: [
                    formatDriverResponse({
                        ...DriverMocks[0],
                        constructor_entity: DriverConstructorMock.find(
                            (constructor) => constructor.id === DriverMocks[0].constructor_id,
                        ),
                    }),
                ],
                count: DriverMocks.length,
            });
    });

    it('/driver/:ref (GET, 200)', () => {
        const entity = formatDriverResponse({
            ...DriverMocks[0],
            constructor_entity: DriverConstructorMock.find(
                (constructor) => constructor.id === DriverMocks[0].constructor_id,
            ),
        });

        return request(app.getHttpServer()).get(`/driver/${entity.ref}`).expect(200).expect(entity);
    });

    it('/driver/:not-existed-ref (GET, 404)', () => {
        return request(app.getHttpServer()).get('/driver/not-found-ref').expect(404);
    });
});
