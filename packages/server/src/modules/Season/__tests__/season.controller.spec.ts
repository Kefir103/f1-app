import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { SeasonController } from '~modules/Season/season.controller';
import { SeasonService } from '~modules/Season/season.service';

describe('SeasonsController', () => {
    let controller: SeasonController;

    const mockService = {
        getAll: jest.fn(),
        getOne: jest.fn().mockReturnValue({}),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeasonController],
            providers: [
                {
                    provide: SeasonService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<SeasonController>(SeasonController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call service getAll with pagination', async () => {
        const page = 1;
        const perPage = 10;

        await controller.getAll({ page, perPage });

        expect(mockService.getAll).toHaveBeenCalledWith({ page, perPage, where: {} });
    });

    it('should call service getAll with default pagination', async () => {
        const pageDefault = 1;
        const perPageDefault = 50;

        await controller.getAll({});

        expect(mockService.getAll).toHaveBeenCalledWith({
            page: pageDefault,
            perPage: perPageDefault,
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
        });
    });

    it('should call service getOne with year', async () => {
        const year = 1;

        await controller.getOne(year);

        expect(mockService.getOne).toHaveBeenCalledWith(year);
    });

    it('should throw NotFoundException if season is falsy', async () => {
        jest.spyOn(mockService, 'getOne').mockReturnValueOnce(null);

        await expect(async () => {
            await controller.getOne(-1);
        }).rejects.toThrow(NotFoundException);
    });
});
