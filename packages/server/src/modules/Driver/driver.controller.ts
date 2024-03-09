import { Controller, Get, Param, Query } from '@nestjs/common';

import { DriverService } from '~modules/Driver/driver.service';

@Controller('drivers')
export class DriverController {
    constructor(private driverService: DriverService) {}

    @Get()
    public async getAll(@Query() { page, perPage }) {
        return await this.driverService.getAll(page, perPage);
    }

    @Get(':ref')
    public async getByRef(@Param('ref') ref: string) {
        return await this.driverService.get(ref);
    }
}
