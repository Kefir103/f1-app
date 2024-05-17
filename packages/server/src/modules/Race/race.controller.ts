import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { RaceService } from '~modules/Race/race.service';

@Controller('race')
export class RaceController {
    constructor(private readonly raceService: RaceService) {}

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
}
