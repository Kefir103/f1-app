import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as lodash from 'lodash';

import { RaceType } from '~f1-app/shared/types/Race/Race.type';

import { Race } from '~entities/Public/Race/Race.entity';
import { RaceService } from '~modules/Race/race.service';

import {
    RacesCircuitsMock,
    RacesConstructorsMock,
    RacesDriversMock,
    RacesMock,
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

        const races = await service.getAll(page, perPage);

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

    it('should return race by id', async () => {
        const raceMock = {
            ...RacesMock[0],
            circuit: RacesCircuitsMock.find((circuit) => circuit.id === RacesMock[0].circuit_id),
        };

        const race = await service.getOne(raceMock.id);

        expect(race).toEqual(raceMock);
    });

    it('should return null if race is not found by id', async () => {
        const race = await service.getOne(-1);

        expect(race).toBeNull();
    });

    it('should return race without winner', async () => {
        let raceMock = RacesMock.find((race) => !race.winner_id) as Omit<RaceType, 'result'>;

        raceMock = {
            ...raceMock,
            circuit: RacesCircuitsMock.find((circuit) => circuit.id === RacesMock[0].circuit_id),
        };

        const race = await service.getOne(raceMock.id);

        expect(race).toEqual(raceMock);
    });
});
