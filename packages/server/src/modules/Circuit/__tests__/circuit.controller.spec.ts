import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CircuitController } from '~modules/Circuit/circuit.controller';
import { CircuitService } from '~modules/Circuit/circuit.service';

describe('CircuitController', () => {
    let controller: CircuitController;
    let module: TestingModule;

    const mockService = {
        getAll: jest.fn(),
        getOne: jest.fn().mockReturnValue({}),
    };

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [CircuitController],
            providers: [
                {
                    provide: CircuitService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<CircuitController>(CircuitController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call service getAll with pagination', async () => {
        const page = 1;
        const perPage = 10;

        await controller.getAll({ page, perPage });

        expect(mockService.getAll).toHaveBeenCalledWith(page, perPage);
    });

    it('should call service getAll with pagination default params', async () => {
        const pageDefault = 1;
        const perPageDefault = 10;

        await controller.getAll({});

        expect(mockService.getAll).toHaveBeenCalledWith(pageDefault, perPageDefault);
    });

    it('should call service getOne with ref', async () => {
        const ref = 'ref';

        await controller.getOne(ref);

        expect(mockService.getOne).toHaveBeenCalledWith(ref);
    });

    it('should throw NotFoundException if circuit is falsy', async () => {
        jest.spyOn(mockService, 'getOne').mockReturnValueOnce(null);

        try {
            await controller.getOne('');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
});
