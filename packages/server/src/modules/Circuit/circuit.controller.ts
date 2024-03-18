import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { CircuitService } from '~modules/Circuit/circuit.service';

@Controller('circuit')
export class CircuitController {
    constructor(private circuitService: CircuitService) {}

    @Get()
    public async getAll(@Query() { page = 1, perPage = 10 }) {
        return await this.circuitService.getAll(page, perPage);
    }

    @Get(':ref')
    public async getOne(@Param('ref') ref: string) {
        const circuit = await this.circuitService.getOne(ref);

        if (!circuit) {
            throw new NotFoundException('Circuit is not found');
        }

        return circuit;
    }
}
