import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { SeasonController } from '~modules/Season/season.controller';
import { SeasonService } from '~modules/Season/season.service';

import { RaceService } from '~modules/Race/race.service';

describe('SeasonsController', () => {
    let controller: SeasonController;

    const mockService = {
        getAll: jest.fn(),
        getOne: jest.fn().mockReturnValue({}),
    };

    const mockRaceService = {
        getAll: jest.fn(),
        getCount: jest.fn().mockReturnValue(1),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeasonController],
            providers: [
                {
                    provide: SeasonService,
                    useValue: mockService,
                },
                {
                    provide: RaceService,
                    useValue: mockRaceService,
                },
            ],
        }).compile();

        controller = module.get<SeasonController>(SeasonController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call service with pagination', async () => {
        const page = 1;
        const perPage = 10;

        await controller.getAll({ page, perPage });

        expect(mockService.getAll).toHaveBeenCalledWith(page, perPage);
    });

    it('should call service with default pagination', async () => {
        const pageDefault = 1;
        const perPageDefault = 10;

        await controller.getAll({});

        expect(mockService.getAll).toHaveBeenCalledWith(pageDefault, perPageDefault);
    });

    it('should call service with year', async () => {
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

    it('should call Race Service with year', async () => {
        const year = 1;
        const count = 1;

        jest.spyOn(mockRaceService, 'getCount').mockReturnValueOnce(count);

        await controller.getRaces(year);

        expect(mockRaceService.getCount).toHaveBeenCalledWith({
            where: {
                year,
            },
        });
        expect(mockRaceService.getAll).toHaveBeenCalledWith({
            page: 1,
            perPage: count,
            where: {
                year,
            },
            order: {
                round: 'ASC',
            },
        });
    });
});
