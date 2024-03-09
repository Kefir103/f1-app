import { Controller, Get, Param, Query } from '@nestjs/common';

import { CircuitService } from '~modules/Circuit/circuit.service';

@Controller('circuit')
export class CircuitController {
    constructor(private circuitService: CircuitService) {}

    @Get()
    public async getAll(@Query() { page, perPage }) {
        return await this.circuitService.getAll(page, perPage);
    }

    @Get(':ref')
    public async getOne(@Param('ref') ref: string) {
        return await this.circuitService.getOne(ref);
    }
}
