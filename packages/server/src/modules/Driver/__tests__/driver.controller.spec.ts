import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { DriverController } from '~modules/Driver/driver.controller';
import { DriverService } from '~modules/Driver/driver.service';

describe('DriverController', () => {
    let controller: DriverController;

    const mockService = {
        getAll: jest.fn(),
        getOne: jest.fn().mockReturnValue({}),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DriverController],
            providers: [
                {
                    provide: DriverService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<DriverController>(DriverController);
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

    it('should throw NotFoundException if driver is falsy', async () => {
        jest.spyOn(mockService, 'getOne').mockReturnValueOnce(null);

        await expect(async () => {
            await controller.getOne('');
        }).rejects.toBeInstanceOf(NotFoundException);
    });
});
