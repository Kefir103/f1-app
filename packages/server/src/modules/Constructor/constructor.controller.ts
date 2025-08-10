import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';
import { FilterParams } from '~decorators/filter/Filter.decorator';

import { ConstructorService } from '~modules/Constructor/constructor.service';

import { Constructor } from '~entities/Public/Constructor/Constructor.entity';

@Controller('constructor')
export class ConstructorController {
    constructor(private readonly constructorService: ConstructorService) {}

    @Get()
    public async getAll(
        @PaginationParams() { page = 1, perPage = 50 }: IPaginationParams,
        @FilterParams(Constructor) filters: FindOptionsWhere<Constructor> = {},
    ) {
        return await this.constructorService.getAll({ page, perPage, where: filters });
    }

    @Get(':ref')
    public async getOne(@Param('ref') ref: string) {
        const constructor = await this.constructorService.getOne(ref);

        if (!constructor) {
            throw new NotFoundException('Constructor not found');
        }

        return constructor;
    }
}
