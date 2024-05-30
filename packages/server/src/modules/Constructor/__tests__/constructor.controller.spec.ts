import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { ConstructorController } from '~modules/Constructor/constructor.controller';
import { ConstructorService } from '~modules/Constructor/constructor.service';

describe('ConstructorsController', () => {
    let controller: ConstructorController;

    const mockService = {
        getAll: jest.fn(),
        getOne: jest.fn().mockReturnValue({}),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConstructorController],
            providers: [
                {
                    provide: ConstructorService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<ConstructorController>(ConstructorController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call service with pagination', async () => {
        const page = 1;
        const perPage = 1;

        await controller.getAll({ page, perPage });

        expect(mockService.getAll).toHaveBeenCalledWith(page, perPage);
    });

    it('should find with pagination default params', async () => {
        const defaultPage = 1;
        const defaultPerPage = 10;

        await controller.getAll({});

        expect(mockService.getAll).toHaveBeenCalledWith(defaultPage, defaultPerPage);
    });

    it('should call service getOne with ref', async () => {
        const ref = 'ref';

        await controller.getOne(ref);

        expect(mockService.getOne).toHaveBeenCalledWith(ref);
    });

    it('should throw NotFoundException if constructor is falsy', async () => {
        mockService.getOne.mockReturnValueOnce(null);

        await expect(async () => {
            await controller.getOne('');
        }).rejects.toBeInstanceOf(NotFoundException);
    });
});
