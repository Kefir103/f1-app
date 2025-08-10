import { FindOptionsWhere } from 'typeorm';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';
import { FilterParams } from '~decorators/filter/Filter.decorator';

import { SeasonService } from '~modules/Season/season.service';

import { Season } from '~entities/Public/Season/Season.entity';

@Controller('season')
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) {}

    @Get()
    public async getAll(
        @PaginationParams() { page = 1, perPage = 50 }: IPaginationParams,
        @FilterParams(Season) filters: FindOptionsWhere<Season> = {},
    ) {
        return await this.seasonService.getAll({ page, perPage, where: filters });
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
