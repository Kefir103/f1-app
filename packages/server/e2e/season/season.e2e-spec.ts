import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as lodash from 'lodash';
import * as moment from 'moment';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { SeasonModule } from '~modules/Season/season.module';

import { Season } from '~entities/Public/Season/Season.entity';
import { SeasonWinnerDriverView } from '~entities/Public/Season/winner/SeasonWinnerDriverView.entity';
import { Driver } from '~entities/Public/Driver/Driver.entity';
import { Constructor } from '~entities/Public/Constructor/Constructor.entity';
import { DriverWinsCount } from '~entities/Records/DriverWinsCount/DriverWinsCount.entity';
import { DriverPolesCount } from '~entities/Records/DriverPolesCount/DriverPolesCount.entity';
import { Race } from '~entities/Public/Race/Race.entity';
import { Circuit } from '~entities/Public/Circuit/Circuit.entity';
import { Result } from '~entities/Public/Result/Result.entity';
import { Status } from '~entities/Directory/Status/Status.entity';
import { RaceWinner } from '~entities/Public/Race/Winner/RaceWinner.entity';
import { DriverStandings } from '~entities/Public/DriverStandings/DriverStandings.entity';

import {
    SeasonsCircuitsMock,
    SeasonsConstructorsMock,
    SeasonsDriversMock,
    SeasonsDriverStandingsMock,
    SeasonsDriverWinnerMock,
    SeasonsMock,
    SeasonsRacesMock,
    SeasonsResultsMock,
    SeasonsStatusMock,
} from '~modules/Season/__tests__/mock/season.mock';

describe('Season e2e', () => {
    let app: NestExpressApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                SeasonModule,
                ...TestDbConnection([
                    {
                        entitySchema: Season,
                        data: SeasonsMock,
                    },
                    {
                        entitySchema: SeasonWinnerDriverView,
                    },
                    {
                        entitySchema: Driver,
                        data: SeasonsDriversMock,
                    },
                    {
                        entitySchema: DriverStandings,
                        data: SeasonsDriverStandingsMock,
                    },
                    {
                        entitySchema: DriverWinsCount,
                    },
                    {
                        entitySchema: DriverPolesCount,
                    },
                    {
                        entitySchema: Constructor,
                        data: SeasonsConstructorsMock,
                    },
                    {
                        entitySchema: Race,
                        data: SeasonsRacesMock,
                    },
                    {
                        entitySchema: RaceWinner,
                    },
                    {
                        entitySchema: Circuit,
                        data: SeasonsCircuitsMock,
                    },
                    {
                        entitySchema: Result,
                        data: SeasonsResultsMock,
                    },
                    {
                        entitySchema: Status,
                        data: SeasonsStatusMock,
                    },
                ]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication<NestExpressApplication>();

        app.set('query parser', 'extended');

        await app.init();
    });

    it('/season (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/season')
            .expect(200)
            .expect({
                data: lodash.orderBy([...SeasonsMock], ['year'], ['desc']),
                count: SeasonsMock.length,
            });
    });

    it('/season with pagination (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/season')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({
                data: [lodash.orderBy([...SeasonsMock], ['year'], ['desc'])[0]],
                count: SeasonsMock.length,
            });
    });

    it('/season with pagination and filters (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/season')
            .query({
                page: 1,
                perPage: 10,
                filter: {
                    id: SeasonsMock[1].id,
                },
            })
            .expect(200)
            .expect({
                data: [SeasonsMock[1]],
                count: 1,
            });
    });

    it('/season with pagination and expand (GET, 200)', async () => {
        const winnerDrivers = SeasonsDriverWinnerMock.map((winnerDriver) => ({
            ...lodash.omit(winnerDriver, 'season'),
            driver: {
                ...winnerDriver.driver,
                date_of_birth: moment(winnerDriver.driver.date_of_birth).format('YYYY-MM-DD'),
            },
        }));

        return request(app.getHttpServer())
            .get('/season')
            .query({
                page: 1,
                perPage: 5,
                expand: ['winner_driver'].join(','),
            })
            .expect(200)
            .expect({
                data: lodash.orderBy(
                    SeasonsMock.map((season) => ({
                        ...season,
                        winner_driver:
                            winnerDrivers.find(({ year }) => year === season.year) ?? null,
                    })),
                    ['year'],
                    ['desc'],
                ),
                count: SeasonsMock.length,
            });
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

    it('/season/:year with expand (GET, 200)', () => {
        const entity = SeasonsMock[0];

        entity.winner_driver =
            SeasonsDriverWinnerMock.find(({ year }) => year === entity.year) ?? null;

        entity.winner_driver.driver.date_of_birth = moment(
            entity.winner_driver.driver.date_of_birth,
        ).format('YYYY-MM-DD') as unknown as Date;

        delete entity.winner_driver.season;

        return request(app.getHttpServer())
            .get(`/season/${entity.year}`)
            .query({
                expand: ['winner_driver'].join(','),
            })
            .expect(200)
            .expect(entity);
    });
});
