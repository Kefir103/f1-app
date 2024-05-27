import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as lodash from 'lodash';
import * as moment from 'moment';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { SeasonModule } from '~modules/Season/season.module';

import { Season } from '~entities/Season/Season.entity';
import { Race } from '~entities/Race/Race.entity';
import { Circuit } from '~entities/Circuit/Circuit.entity';
import { Result } from '~entities/Result/Result.entity';
import { Driver } from '~entities/Driver/Driver.entity';
import { Constructor } from '~entities/Constructor/Constructor.entity';
import { Qualifying } from '~entities/Qualifying/Qualifying.entity';
import { Status } from '~entities/Status/Status.entity';

import {
    SeasonsCircuitsMock,
    SeasonsConstructorsMock,
    SeasonsDriversMock,
    SeasonsMock,
    SeasonsQualifyingsMock,
    SeasonsRacesMock,
    SeasonsResultsMock,
    SeasonsStatusesMock,
} from '~modules/Season/__tests__/mock/season.mock';

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
                    {
                        entitySchema: Circuit,
                        data: SeasonsCircuitsMock,
                    },
                    {
                        entitySchema: Race,
                        data: SeasonsRacesMock,
                    },
                    {
                        entitySchema: Result,
                        data: SeasonsResultsMock,
                    },
                    {
                        entitySchema: Driver,
                        data: SeasonsDriversMock,
                    },
                    {
                        entitySchema: Constructor,
                        data: SeasonsConstructorsMock,
                    },
                    {
                        entitySchema: Qualifying,
                        data: SeasonsQualifyingsMock,
                    },
                    {
                        entitySchema: Status,
                        data: SeasonsStatusesMock,
                    },
                ]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/season (GET)', () => {
        return request(app.getHttpServer())
            .get('/season')
            .expect(200)
            .expect({
                data: lodash.orderBy([...SeasonsMock], ['year'], ['desc']),
                count: SeasonsMock.length,
            });
    });

    it('/season with pagination (GET)', () => {
        return request(app.getHttpServer())
            .get('/season')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({
                data: [lodash.orderBy([...SeasonsMock], ['year'], ['desc'])[0]],
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

    it('/season/:year/races (GET, 200)', () => {
        const season = SeasonsMock[0];
        const races = SeasonsRacesMock.filter((race) => race.year === season.year).map((race) => ({
            ...race,
            date: moment(race.date).format('YYYY-MM-DD'),
        }));

        return request(app.getHttpServer()).get(`/season/${season.year}/races`).expect(200).expect({
            data: races,
            count: races.length,
        });
    });
});
