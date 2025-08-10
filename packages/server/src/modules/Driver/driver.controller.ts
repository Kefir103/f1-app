import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';
import { ExpandParams } from '~decorators/expand/Expand.decorator';
import { FilterParams } from '~decorators/filter/Filter.decorator';

import { Driver } from '~entities/Public/Driver/Driver.entity';

import { DriverService } from '~modules/Driver/driver.service';

@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService) {}

    @Get()
    public async getAll(
        @PaginationParams() { page = 1, perPage = 50 }: IPaginationParams,
        @FilterParams(Driver) filters: FindOptionsWhere<Driver> = {},
        @ExpandParams(Driver) driverRelations: FindOptionsRelations<Driver> = {},
    ) {
        return await this.driverService.getAll({
            page,
            perPage,
            relations: driverRelations,
            where: filters,
        });
    }

    @Get(':ref')
    public async getOne(
        @Param('ref') ref: string,
        @ExpandParams(Driver) driverRelations: FindOptionsRelations<Driver> = {},
    ) {
        const driver = await this.driverService.getOne(ref, {
            relations: driverRelations,
        });

        if (!driver) {
            throw new NotFoundException('Driver not found');
        }

        return driver;
    }
}
