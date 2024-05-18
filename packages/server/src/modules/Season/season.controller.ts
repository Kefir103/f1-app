import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { SeasonService } from '~modules/Season/season.service';

@Controller('season')
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) {}

    @Get()
    public async getAll(@Query() { page = 1, perPage = 10 }) {
        return await this.seasonService.getAll(page, perPage);
    }

    @Get(':year')
    public async getOne(@Param('year') year: number) {
        const season = await this.seasonService.getOne(year);

        if (!season) {
            throw new NotFoundException('Season is not found');
        }

        return season;
    }
}
