import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { RaceService } from '~modules/Race/race.service';
import { ResultsService } from '~modules/Results/results.service';

@Controller('race')
export class RaceController {
    constructor(
        private readonly raceService: RaceService,
        private readonly resultsService: ResultsService,
    ) {}

    @Get()
    public async getAll(@Query() { page = 1, perPage = 10 }) {
        return await this.raceService.getAll(page, perPage);
    }

    @Get(':id')
    public async getOne(@Param('id') id: number) {
        const race = await this.raceService.getOne(id);

        if (!race) {
            throw new NotFoundException('Race is not found');
        }

        return race;
    }

    @Get(':id/results')
    public async getResults(@Param('id') id: number) {
        return await this.resultsService.getAll({ where: { race_id: id } });
    }
}
