import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as lodash from 'lodash';

import { RaceType } from '~f1-app/shared/types/Race/Race.type';
import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';
import { ResultType } from '~f1-app/shared/types/Result/Result.type';

import { Race } from '~entities/Public/Race/Race.entity';

import { RaceService } from '~modules/Race/race.service';

import {
    RacesCircuitsMock,
    RacesConstructorsMock,
    RacesDriversMock,
    RacesMock,
    RacesResultsMock,
} from '~modules/Race/__tests__/mocks/Race.mock';

import { UnitMockRepository } from '~test-utils/unit/mock-repository/UnitMockRepository';

describe('RaceService', () => {
    let service: RaceService;

    const raceUnitMockRepository = UnitMockRepository(RacesMock, [
        {
            name: 'circuit',
            key: 'circuit_id',
            foreign_key: 'id',
            multiple: false,
            entities: RacesCircuitsMock,
        },
        {
            name: 'results',
            key: 'id',
            foreign_key: 'race_id',
            multiple: true,
            entities: RacesResultsMock,
        },
        {
            name: 'winner',
            key: 'id',
            foreign_key: 'race_id',
            multiple: false,
            entities: {
                drivers: RacesDriversMock,
                results: RacesResultsMock,
            },
            relationFn: (
                race: RaceType,
                { drivers, results }: { drivers: DriverType[]; results: ResultType[] },
            ) => {
                const raceWinResult = results.find((result) => result.race_id === race.id);

                if (!raceWinResult) {
                    return null;
                }

                return drivers.find((driver) => driver.id === raceWinResult.driver_id);
            },
        },
    ]);

    const driverUnitMockRepository = UnitMockRepository(RacesDriversMock, [
        {
            name: 'constructor_entity',
            key: 'constructor_id',
            foreign_key: 'id',
            multiple: false,
            entities: RacesConstructorsMock,
        },
    ]);

    const mockRepository = {
        find: jest.fn().mockImplementation(raceUnitMockRepository.find),
        findOne: jest.fn().mockImplementation(raceUnitMockRepository.findOne),
        count: jest.fn().mockImplementation(raceUnitMockRepository.count),
    };

    const mockDataSource = {
        getRepository: jest.fn().mockImplementation(() => ({
            find: jest.fn().mockImplementation(driverUnitMockRepository.find),
        })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RaceService,
                {
                    provide: getRepositoryToken(Race),
                    useValue: mockRepository,
                },
                {
                    provide: getDataSourceToken(),
                    useValue: mockDataSource,
                },
            ],
        }).compile();

        service = module.get<RaceService>(RaceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return races with pagination', async () => {
        const page = 1;
        const perPage = 10;

        const races = await service.getAll({ page, perPage });

        const expectedRaces = {
            data: lodash.orderBy(
                RacesMock.map((race) => ({
                    ...race,
                    circuit: RacesCircuitsMock.find((circuit) => race.circuit_id === circuit.id),
                })),
                ['year', 'round'],
                ['desc', 'desc'],
            ),
            count: RacesMock.length,
        };

        expect(races).toEqual(expectedRaces);
    });

    it('should return races with pagination and results from relations param', async () => {
        const page = 1;
        const perPage = 10;
        const relations = {
            results: true,
        };

        const races = await service.getAll({ page, perPage, relations });

        const expectedRaces = {
            data: lodash.orderBy(
                RacesMock.map((race) => ({
                    ...race,
                    circuit: RacesCircuitsMock.find((circuit) => circuit.id === race.circuit_id),
                    results: RacesResultsMock.filter((result) => result.race_id === race.id),
                })),
                ['year', 'round'],
                ['desc', 'desc'],
            ),
            count: RacesMock.length,
        };

        expect(races).toEqual(expectedRaces);
    });

    it('should return races with pagination and filters', async () => {
        const page = 1;
        const perPage = 10;
        const filters = {
            id: RacesMock[1].id,
        };

        const races = await service.getAll({ page, perPage, where: filters });

        const expectedRaces = {
            data: [
                {
                    ...RacesMock[1],
                    circuit: RacesCircuitsMock.find(({ id }) => id === RacesMock[1].circuit_id),
                },
            ],
            count: 1,
        };

        expect(races).toEqual(expectedRaces);
    });

    it('should return race by id', async () => {
        const raceMock = {
            ...RacesMock[0],
            circuit: RacesCircuitsMock.find((circuit) => circuit.id === RacesMock[0].circuit_id),
        };

        const race = await service.getOne(raceMock.id);

        expect(race).toEqual(raceMock);
    });

    it('should return race by id with results from relations param', async () => {
        const raceMock = {
            ...RacesMock[0],
            circuit: RacesCircuitsMock.find((circuit) => circuit.id === RacesMock[0].circuit_id),
            results: RacesResultsMock.filter((result) => result.race_id === RacesMock[0].id),
        };

        const race = await service.getOne(raceMock.id, {
            relations: {
                results: true,
            },
        });

        expect(race).toEqual(raceMock);
    });

    it('should return race by id with winner from relations param', async () => {
        type RaceMockType = Omit<RaceType, 'circuit' | 'winner'> & {
            circuit: CircuitType;
            winner: Omit<DriverType, 'constructor_entity'>;
        };

        const raceWinResult = RacesResultsMock.find((result) => result.position === 1);

        const raceMock = {
            ...RacesMock.find((race) => race.id === raceWinResult.race_id),
            circuit: null,
            winner: null,
        } as RaceMockType;

        raceMock.circuit = RacesCircuitsMock.find((circuit) => circuit.id === raceMock.circuit_id);
        raceMock.winner = RacesDriversMock.find((driver) => driver.id === raceWinResult.driver_id);

        const race = await service.getOne(raceMock.id, {
            relations: {
                winner: true,
            },
        });

        expect(race).toEqual(raceMock);
    });

    it('should return null if race is not found by id', async () => {
        const race = await service.getOne(-1);

        expect(race).toBeNull();
    });
});
