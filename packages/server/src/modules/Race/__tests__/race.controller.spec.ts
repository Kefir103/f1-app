import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { RaceController } from '~modules/Race/race.controller';
import { RaceService } from '~modules/Race/race.service';
import { ResultsService } from '~modules/Results/results.service';

describe('RaceController', () => {
    let controller: RaceController;

    const mockRaceService = {
        getAll: jest.fn(),
        getOne: jest.fn().mockReturnValue({}),
    };

    const mockResultsService = {
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

    it('should call service with pagination and empty relations', async () => {
        const page = 1;
        const perPage = 10;

        await controller.getAll({ page, perPage });

        expect(mockRaceService.getAll).toHaveBeenCalledWith({
            page,
            perPage,
            relations: {},
            where: {},
        });
    });

    it('should call service getAll with default pagination and emptyRelations', async () => {
        const pageDefault = 1;
        const perPageDefault = 50;

        await controller.getAll({});

        expect(mockRaceService.getAll).toHaveBeenCalledWith({
            page: pageDefault,
            perPage: perPageDefault,
            relations: {},
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

        expect(mockRaceService.getAll).toHaveBeenCalledWith({
            page: page,
            perPage: perPage,
            where: filters,
            relations: {},
        });
    });

    it('should call service getAll with pagination and relations', async () => {
        const page = 1;
        const perPage = 10;
        const relations = {
            results: true,
        };

        await controller.getAll({ page, perPage }, {}, relations);

        expect(mockRaceService.getAll).toHaveBeenCalledWith({
            page: page,
            perPage: perPage,
            relations: relations,
            where: {},
        });
    });

    it('should call service getOne with id and empty relations', async () => {
        const id = 1;

        await controller.getOne(id);

        expect(mockRaceService.getOne).toHaveBeenCalledWith(id, { relations: {} });
    });

    it('should call service getOne with id and relations', async () => {
        const id = 1;
        const relations = {
            results: true,
        };

        await controller.getOne(id, relations);

        expect(mockRaceService.getOne).toHaveBeenCalledWith(id, { relations });
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
            relations: {
                driver: true,
                constructor_entity: true,
            },
        });
    });
});
