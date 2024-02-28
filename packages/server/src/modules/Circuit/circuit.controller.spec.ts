import { Test, TestingModule } from '@nestjs/testing';
import { CircuitController } from '~modules/Circuit/circuit.controller';

describe('CircuitController', () => {
    let controller: CircuitController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CircuitController],
        }).compile();

        controller = module.get<CircuitController>(CircuitController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
