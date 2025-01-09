import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';

import { DriverService } from '~modules/Driver/driver.service';

@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService) {}

    @Get()
    public async getAll(@PaginationParams() { page = 1, perPage = 50 }: IPaginationParams) {
        return await this.driverService.getAll(page, perPage);
    }

    @Get(':ref')
    public async getOne(@Param('ref') ref: string) {
        const driver = await this.driverService.getOne(ref);

        if (!driver) {
            throw new NotFoundException('Driver not found');
        }

        return driver;
    }
}
