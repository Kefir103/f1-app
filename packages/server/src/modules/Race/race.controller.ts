import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FindOptionsRelations } from 'typeorm';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';
import { ExpandParams } from '~decorators/expand/Expand.decorator';

import { RaceService } from '~modules/Race/race.service';
import { ResultsService } from '~modules/Results/results.service';

import { Race } from '~entities/Public/Race/Race.entity';

@Controller('race')
export class RaceController {
    constructor(
        private readonly raceService: RaceService,
        private readonly resultsService: ResultsService,
    ) {}

    @Get()
    public async getAll(
        @PaginationParams() { page = 1, perPage = 50 }: IPaginationParams,
        @ExpandParams(Race) raceRelations: FindOptionsRelations<Race> = {},
    ) {
        return await this.raceService.getAll({ page, perPage, relations: raceRelations });
    }

    @Get(':id')
    public async getOne(
        @Param('id') id: number,
        @ExpandParams(Race) raceRelations: FindOptionsRelations<Race> = {},
    ) {
        const race = await this.raceService.getOne(id, { relations: raceRelations });

        if (!race) {
            throw new NotFoundException('Race is not found');
        }

        return race;
    }

    @Get(':id/results')
    public async getResults(@Param('id') id: number) {
        return await this.resultsService.getAll({
            where: { race_id: id },
            relations: {
                driver: true,
                constructor_entity: true,
            },
        });
    }
}
