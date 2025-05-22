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

    it('should call service getAll with pagination and empty relations and filters', async () => {
        const page = 1;
        const perPage = 10;

        await controller.getAll({ page, perPage });

        expect(mockService.getAll).toHaveBeenCalledWith({
            page,
            perPage,
            relations: {},
            where: {},
        });
    });

    it('should call service getAll with pagination default params and empty relations and filters', async () => {
        const pageDefault = 1;
        const perPageDefault = 50;

        await controller.getAll({});

        expect(mockService.getAll).toHaveBeenCalledWith({
            page: pageDefault,
            perPage: perPageDefault,
            relations: {},
            where: {},
        });
    });

    it('should call service getAll with pagination and relations', async () => {
        const page = 1;
        const perPage = 10;
        const relations = {
            constructor_entity: true,
        };

        await controller.getAll({ page, perPage }, {}, relations);

        expect(mockService.getAll).toHaveBeenCalledWith({
            page: page,
            perPage: perPage,
            relations: relations,
            where: {},
        });
    });

    it('should call service getAll with pagination and filters', async () => {
        const page = 1;
        const perPage = 10;
        const filters = {
            id: 1,
        };

        await controller.getAll({ page, perPage }, filters);

        expect(mockService.getAll).toHaveBeenCalledWith({
            page: page,
            perPage: perPage,
            where: filters,
            relations: {},
        });
    });

    it('should call service getAll with pagination, filters and relations', async () => {
        const page = 1;
        const perPage = 10;
        const filters = {
            id: 1,
        };
        const relations = {
            constructor_entity: true,
        };

        await controller.getAll({ page, perPage }, filters, relations);

        expect(mockService.getAll).toHaveBeenCalledWith({
            page: page,
            perPage: perPage,
            relations: relations,
            where: filters,
        });
    });

    it('should call service getOne with ref and empty relations', async () => {
        const ref = 'ref';

        await controller.getOne(ref);

        expect(mockService.getOne).toHaveBeenCalledWith(ref, { relations: {} });
    });

    it('should call service getOne with ref and relations', async () => {
        const ref = 'ref';
        const driverRelations = {
            constructor_entity: true,
        };

        await controller.getOne(ref, driverRelations);
    });

    it('should throw NotFoundException if driver is falsy', async () => {
        jest.spyOn(mockService, 'getOne').mockReturnValueOnce(null);

        await expect(async () => {
            await controller.getOne('');
        }).rejects.toBeInstanceOf(NotFoundException);
    });
});
