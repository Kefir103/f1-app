import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Result } from '~entities/Result/Result.entity';

import { UnitMockRepository } from '~test-utils/unit/mock-repository/UnitMockRepository';

import { ResultsDriversMock, ResultsMock } from '~modules/Results/__tests__/mocks/Results.mock';
import { ResultsService } from '~modules/Results/results.service';

describe('ResultsService', () => {
    let service: ResultsService;

    const resultUnitMockRepository = UnitMockRepository(ResultsMock, [
        {
            name: 'driver',
            key: 'driver_id',
            foreign_key: 'id',
            entities: ResultsDriversMock,
            multiple: false,
        },
    ]);

    const mockRepository = {
        find: jest.fn().mockImplementation(resultUnitMockRepository.find),
        count: jest.fn().mockImplementation(resultUnitMockRepository.count),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ResultsService,
                {
                    provide: getRepositoryToken(Result),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ResultsService>(ResultsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all race results', async () => {
        const raceId = 1;

        const results = await service.getAll({
            where: {
                race_id: raceId,
            },
            relations: {
                driver: true,
            },
        });

        const expectedFilteredResults = ResultsMock.filter(
            (result) => result.race_id === raceId,
        ).map((result) => ({
            ...result,
            driver: ResultsDriversMock.find((driver) => driver.id === result.driver_id),
        }));

        const expectedResults = {
            data: expectedFilteredResults,
            count: expectedFilteredResults.length,
        };

        expect(results).toEqual(expectedResults);
    });
});
