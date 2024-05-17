import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DriverService } from '~modules/Driver/driver.service';
import { Driver } from '~entities/Driver/Driver.entity';

import { DriverConstructorMock, DriverMocks } from '~modules/Driver/__tests__/mocks/Driver.mock';

import { UnitMockRepository } from '~test-utils/unit/mock-repository/UnitMockRepository';

describe('DriverService', () => {
    let service: DriverService;
    const driverUnitMockRepository = UnitMockRepository(DriverMocks, [
        {
            name: 'constructor_entity',
            key: 'constructor_id',
            foreign_key: 'id',
            multiple: false,
            entities: DriverConstructorMock,
        },
    ]);

    const mockRepository = {
        find: jest.fn().mockImplementation(driverUnitMockRepository.find),
        findOne: jest.fn().mockImplementation(driverUnitMockRepository.findOne),
        count: jest.fn().mockImplementation(driverUnitMockRepository.count),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DriverService,
                {
                    provide: getRepositoryToken(Driver),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<DriverService>(DriverService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find with pagination', async () => {
        const page = 1;
        const perPage = 1;

        const driversWithCount = await service.getAll(page, perPage);

        const expectedDriversWithCount = {
            data: [
                {
                    ...DriverMocks[0],
                    constructor_entity: DriverConstructorMock.find(
                        (constructor) => constructor.id === DriverMocks[0].constructor_id,
                    ),
                },
            ],
            count: DriverMocks.length,
        };

        expect(driversWithCount).toEqual(expectedDriversWithCount);
    });

    it('should find one driver by ref', async () => {
        const ref = DriverMocks[0].ref;

        const driver = await service.getOne(ref);

        const expectedDriver = {
            ...DriverMocks[0],
            constructor_entity: DriverConstructorMock.find(
                (constructor) => constructor.id === DriverMocks[0].constructor_id,
            ),
        };

        expect(driver).toEqual(expectedDriver);
    });
});
