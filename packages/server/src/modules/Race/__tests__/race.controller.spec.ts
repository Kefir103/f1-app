import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { RaceController } from '~modules/Race/race.controller';
import { RaceService } from '~modules/Race/race.service';
import { ResultsService } from '~modules/Results/results.service';

describe('RaceController', () => {
    let controller: RaceController;

    let mockRaceService = {
        getAll: jest.fn(),
        getOne: jest.fn().mockReturnValue({}),
    };

    let mockResultsService = {
        getAll: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RaceController],
            providers: [
                {
                    provide: RaceService,
                    useValue: mockRaceService,
                },
                {
                    provide: ResultsService,
                    useValue: mockResultsService,
                },
            ],
        }).compile();

        controller = module.get<RaceController>(RaceController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call service with pagination', async () => {
        const page = 1;
        const perPage = 10;

        await controller.getAll({ page, perPage });

        expect(mockRaceService.getAll).toHaveBeenCalledWith(page, perPage);
    });

    it('should call service with default pagination', async () => {
        const pageDefault = 1;
        const perPageDefault = 10;

        await controller.getAll({});

        expect(mockRaceService.getAll).toHaveBeenCalledWith(pageDefault, perPageDefault);
    });

    it('should call service getOne with id', async () => {
        const id = 1;

        await controller.getOne(id);

        expect(mockRaceService.getOne).toHaveBeenCalledWith(id);
    });

    it('should return NotFoundException if race is falsy', async () => {
        mockRaceService.getOne.mockReturnValueOnce(null);

        const id = -1;

        await expect(async () => {
            await controller.getOne(id);
        }).rejects.toThrow(NotFoundException);
    });

    it('should call results service with race_id', async () => {
        const id = 1;

        await controller.getResults(id);

        expect(mockResultsService.getAll).toHaveBeenCalledWith({
            where: { race_id: id },
            relations: { driver: true },
        });
    });
});
