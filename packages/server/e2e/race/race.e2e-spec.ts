import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';
import * as lodash from 'lodash';

import { TestDbConnection } from '~test-utils/db/DbConnection';

import { RaceModule } from '~modules/Race/race.module';
import { Race } from '~entities/Race/Race.entity';

import { Circuit } from '~entities/Circuit/Circuit.entity';

import type { RaceType } from '~f1-app/shared/types/Race/Race.type';

import { RacesMock, RacesCircuitsMock } from '~modules/Race/__tests__/mocks/Race.mock';

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
                ...TestDbConnection([
                    {
                        entitySchema: Circuit,
                        data: RacesCircuitsMock,
                    },
                    {
                        entitySchema: Race,
                        data: RacesMock,
                    },
                ]),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/race (GET)', () => {
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

    it('/race with pagination (GET)', () => {
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

    it('/race/:not-existed-id (GET, 404)', () => {
        return request(app.getHttpServer()).get('/race/not-found-id').expect(404);
    });
});
