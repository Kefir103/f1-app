import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Constructor } from '~entities/Constructor/Constructor.entity';
import { ConstructorService } from '~modules/Constructor/constructor.service';

import { ConstructorsMock } from '~modules/Constructor/__tests__/mock/Constructor.mock';

import { UnitMockRepository } from '~test-utils/unit/mock-repository/UnitMockRepository';

describe('ConstructorsService', () => {
    let service: ConstructorService;

    const constructorUnitMockRepository = UnitMockRepository(ConstructorsMock);

    const mockRepository = {
        find: jest.fn().mockImplementation(constructorUnitMockRepository.find),
        findOneBy: jest.fn().mockImplementation(constructorUnitMockRepository.findOneBy),
        count: jest.fn().mockReturnValue(constructorUnitMockRepository.count),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ConstructorService,
                {
                    provide: getRepositoryToken(Constructor),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ConstructorService>(ConstructorService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find with pagination', async () => {
        const page = 1;
        const perPage = 1;

        const constructorsWithCount = await service.getAll(page, perPage);

        const expectedConstructorsWithCount = {
            data: [ConstructorsMock[0]],
            count: ConstructorsMock.length,
        };

        expect(constructorsWithCount).toEqual(expectedConstructorsWithCount);
    });

    it('should find one constructor by ref', async () => {
        const ref = ConstructorsMock[0].ref;

        const constructor = await service.getOne(ref);

        const expectedConstructor = ConstructorsMock[0];

        expect(constructor).toEqual(expectedConstructor);
    });
});
