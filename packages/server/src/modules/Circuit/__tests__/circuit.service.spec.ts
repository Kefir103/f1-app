import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CircuitService } from '~modules/Circuit/circuit.service';
import { Circuit } from '~entities/Circuit/Circuit.entity';

import { CircuitMocks } from '~modules/Circuit/__tests__/mocks/Circuit.mock';

import { UnitMockRepository } from '~test-utils/unit/mock-repository/UnitMockRepository';

describe('CircuitService', () => {
    let service: CircuitService;

    const circuitUnitMockRepository = UnitMockRepository(CircuitMocks);

    const mockRepository = {
        find: jest.fn().mockImplementation(circuitUnitMockRepository.find),
        findOneBy: jest.fn().mockImplementation(circuitUnitMockRepository.findOneBy),
        count: jest.fn().mockImplementation(circuitUnitMockRepository.count),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CircuitService,
                {
                    provide: getRepositoryToken(Circuit),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<CircuitService>(CircuitService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find with pagination', async () => {
        const page = 1;
        const perPage = 1;

        const circuitsWithCount = await service.getAll(page, perPage);

        const expectedCircuitsWithCount = {
            data: [CircuitMocks[0]],
            count: CircuitMocks.length,
        };

        expect(circuitsWithCount).toEqual(expectedCircuitsWithCount);
    });

    it('should find one circuit by ref', async () => {
        const ref = CircuitMocks[0].ref;

        const circuit = await service.getOne(ref);

        const expectedCircuit = CircuitMocks[0];

        expect(circuit).toEqual(expectedCircuit);
    });
});
