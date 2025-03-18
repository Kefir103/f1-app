import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';
import * as lodash from 'lodash';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { RaceModule } from '~modules/Race/race.module';
import { Race } from '~entities/Public/Race/Race.entity';

import { ResultsModule } from '~modules/Results/results.module';
import { Result } from '~entities/Public/Result/Result.entity';

import { Circuit } from '~entities/Public/Circuit/Circuit.entity';

import { Driver } from '~entities/Public/Driver/Driver.entity';
import { Constructor } from '~entities/Public/Constructor/Constructor.entity';
import { Qualifying } from '~entities/Public/Qualifying/Qualifying.entity';
import { Status } from '~entities/Directory/Status/Status.entity';
import { DriverWinsCount } from '~entities/Records/DriverWinsCount/DriverWinsCount.entity';
import { DriverPolesCount } from '~entities/Records/DriverPolesCount/DriverPolesCount.entity';
import { RaceWinner } from '~entities/Public/Race/Winner/RaceWinner.entity';

import type { RaceType } from '~f1-app/shared/types/Race/Race.type';

import {
    RacesMock,
    RacesCircuitsMock,
    RacesResultsMock,
    RacesDriversMock,
    RacesConstructorsMock,
    RacesQualifyingsMock,
    RacesStatusesMock,
} from '~modules/Race/__tests__/mocks/Race.mock';

function formatRaceResponse(race: RaceType) {
    return {
        ...race,
        date: moment.isDate(race.date) ? moment(race.date).format('YYYY-MM-DD') : null,
        fp1_date: moment.isDate(race.fp1_date) ? moment(race.fp1_date).format('YYYY-MM-DD') : null,
        fp2_date: moment.isDate(race.fp2_date) ? moment(race.fp2_date).format('YYYY-MM-DD') : null,
        fp3_date: moment.isDate(race.fp3_date) ? moment(race.fp3_date).format('YYYY-MM-DD') : null,
        qualifying_date: moment.isDate(race.qualifying_date)
            ? moment(race.qualifying_date).format('YYYY-MM-DD')
            : null,
        sprint_date: moment.isDate(race.sprint_date)
            ? moment(race.sprint_date).format('YYYY-MM-DD')
            : null,
    };
}

describe('Race e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                RaceModule,
                ResultsModule,
                ...TestDbConnection([
                    {
                        entitySchema: Circuit,
                        data: RacesCircuitsMock,
                    },
                    {
                        entitySchema: Result,
                        data: RacesResultsMock,
                    },
                    {
                        entitySchema: Race,
                        data: RacesMock,
                    },
                    {
                        entitySchema: Driver,
                        data: RacesDriversMock,
                    },
                    {
                        entitySchema: Constructor,
                        data: RacesConstructorsMock,
                    },
                    {
                        entitySchema: Qualifying,
                        data: RacesQualifyingsMock,
                    },
                    {
                        entitySchema: Status,
                        data: RacesStatusesMock,
                    },
                    {
                        entitySchema: DriverWinsCount,
                    },
                    {
                        entitySchema: DriverPolesCount,
                    },
                    {
                        entitySchema: RaceWinner,
                    },
                ]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/race (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/race')
            .expect(200)
            .expect({
                data: lodash.orderBy(
                    RacesMock.map(formatRaceResponse).map((race) => ({
                        ...race,
                        circuit: RacesCircuitsMock.find(
                            (circuit) => circuit.id === race.circuit_id,
                        ),
                    })),
                    ['year', 'round'],
                    ['desc', 'desc'],
                ),
                count: RacesMock.length,
            });
    });

    it('/race with pagination (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/race')
            .query({ page: 1, perPage: 1 })
            .expect(200)
            .expect({
                data: [
                    lodash.orderBy(
                        RacesMock.map(formatRaceResponse).map((race) => ({
                            ...race,
                            circuit: RacesCircuitsMock.find(
                                (circuit) => circuit.id === race.circuit_id,
                            ),
                        })),
                        ['year', 'round'],
                        ['desc', 'desc'],
                    )[0],
                ],
                count: RacesMock.length,
            });
    });

    it('/race with pagination and expand (GET, 200)', () => {
        return request(app.getHttpServer())
            .get('/race')
            .query({ page: 1, perPage: 1, expand: ['results'].join(',') })
            .expect(200)
            .expect({
                data: [
                    lodash.orderBy(
                        RacesMock.map(formatRaceResponse).map((race) => ({
                            ...race,
                            circuit: RacesCircuitsMock.find(
                                (circuit) => circuit.id === race.circuit_id,
                            ),
                            results: RacesResultsMock.filter(
                                (result) => result.race_id === race.id,
                            ),
                        })),
                        ['year', 'round'],
                        ['desc', 'desc'],
                    )[0],
                ],
                count: RacesMock.length,
            });
    });

    it('/race/:id (GET, 200)', () => {
        const entity = RacesMock[0];

        return request(app.getHttpServer())
            .get(`/race/${entity.id}`)
            .expect(200)
            .expect(
                formatRaceResponse({
                    ...entity,
                    circuit: RacesCircuitsMock.find((circuit) => circuit.id === entity.circuit_id),
                }),
            );
    });

    it('/race/:id?expand=results (GET, 200)', () => {
        const entity = RacesMock[0];

        return request(app.getHttpServer())
            .get(`/race/${entity.id}`)
            .query({ expand: ['results'].join(',') })
            .expect(200)
            .expect(
                formatRaceResponse({
                    ...entity,
                    circuit: RacesCircuitsMock.find((circuit) => circuit.id === entity.circuit_id),
                    results: RacesResultsMock.filter((result) => result.race_id === entity.id).map(
                        (result) => lodash.omit(result, ['status', 'driver', 'constructor_entity']),
                    ),
                } as RaceType),
            );
    });

    it('/race/:id?expand=winner (GET, 200)', () => {
        const raceWinResult = RacesResultsMock.find((result) => result.position === 1);

        const entity = formatRaceResponse({
            ...RacesMock.find((race) => race.id === raceWinResult.race_id),
            circuit: null,
        });

        const raceWinner = RacesDriversMock.find((driver) => driver.id === raceWinResult.driver_id);

        return request(app.getHttpServer())
            .get(`/race/${entity.id}`)
            .query({ expand: ['winner'].join(',') })
            .expect(200)
            .expect({
                ...entity,
                circuit: RacesCircuitsMock.find((circuit) => circuit.id === entity.circuit_id),
                winner: lodash.omit(
                    {
                        ...raceWinner,
                        date_of_birth: moment(raceWinner.date_of_birth).format('YYYY-MM-DD'),
                    },
                    ['wins_count', 'poles_count'],
                ),
            });
    });

    it('/race/:not-existed-id (GET, 404)', () => {
        return request(app.getHttpServer()).get('/race/not-found-id').expect(404);
    });

    it('/race/:id/results (GET, 200)', () => {
        const entity = RacesMock[0];
        const entityResults = RacesResultsMock.filter((result) => result.race_id === entity.id).map(
            (result) => {
                return {
                    ...result,
                    driver: lodash.omit(
                        {
                            ...result.driver,
                            date_of_birth: moment(result.driver.date_of_birth).format('YYYY-MM-DD'),
                        },
                        ['wins_count', 'poles_count'],
                    ),
                };
            },
        );

        return request(app.getHttpServer()).get(`/race/${entity.id}/results`).expect(200).expect({
            data: entityResults,
            count: entityResults.length,
        });
    });
});
