import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as lodash from 'lodash';

import { Race } from '~entities/Race/Race.entity';
import { RaceService } from '~modules/Race/race.service';

import { RacesMock } from '~modules/Race/__tests__/mocks/Race.mock';

import { UnitMockRepository } from '~test-utils/unit/mock-repository/UnitMockRepository';

describe('RaceService', () => {
    let service: RaceService;

    const raceUnitMockRepository = UnitMockRepository(RacesMock);

    const mockRepository = {
        find: jest.fn().mockImplementation(raceUnitMockRepository.find),
        findOneBy: jest.fn().mockImplementation(raceUnitMockRepository.findOneBy),
        count: jest.fn().mockReturnValue(raceUnitMockRepository.count),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RaceService,
                {
                    provide: getRepositoryToken(Race),
                    useValue: mockRepository,
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
            data: lodash.orderBy(RacesMock, ['year', 'round'], ['desc', 'desc']),
            count: RacesMock.length,
        };

        expect(races).toEqual(expectedRaces);
    });

    it('should return race by id', async () => {
        const raceMock = RacesMock[0];

        const race = await service.getOne(raceMock.id);

        expect(race).toEqual(raceMock);
    });
});
