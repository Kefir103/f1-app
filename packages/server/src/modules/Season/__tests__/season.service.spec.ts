import * as lodash from 'lodash';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Season } from '~entities/Season/Season.entity';
import { SeasonService } from '~modules/Season/season.service';

import { SeasonsMock } from '~modules/Season/__tests__/mock/season.mock';

import { UnitMockRepository } from '~test-utils/unit/mock-repository/UnitMockRepository';

describe('SeasonsService', () => {
    let service: SeasonService;

    const seasonUnitMockRepository = UnitMockRepository(SeasonsMock);

    const mockRepository = {
        find: jest.fn().mockImplementation(seasonUnitMockRepository.find),
        findOneBy: jest.fn().mockImplementation(seasonUnitMockRepository.findOneBy),
        count: jest.fn().mockImplementation(seasonUnitMockRepository.count),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SeasonService,
                {
                    provide: getRepositoryToken(Season),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<SeasonService>(SeasonService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find with pagination', async () => {
        const page = 1;
        const perPage = 1;

        const seasonsWithCount = await service.getAll(page, perPage);

        const expectedSeasonsWithCount = {
            data: [lodash.orderBy([...SeasonsMock], ['year'], ['desc'])[0]],
            count: SeasonsMock.length,
        };

        expect(seasonsWithCount).toEqual(expectedSeasonsWithCount);
    });

    it('should find with sort by year DESC', async () => {
        const seasonsMock = SeasonsMock;

        const page = 1;
        const perPage = seasonsMock.length;

        const sortedSeasons = await service.getAll(page, perPage);

        const expectedSeasons = {
            data: lodash.orderBy([...seasonsMock], ['year'], ['desc']),
            count: seasonsMock.length,
        };

        expect(sortedSeasons).toEqual(expectedSeasons);
    });

    it('should find one by year', async () => {
        const seasonMock = SeasonsMock[0];

        const season = await service.getOne(seasonMock.year);

        expect(season).toEqual(seasonMock);
    });
});
