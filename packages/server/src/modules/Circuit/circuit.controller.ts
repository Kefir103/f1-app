import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';

import { CircuitService } from '~modules/Circuit/circuit.service';

@Controller('circuit')
export class CircuitController {
    constructor(private circuitService: CircuitService) {}

    @Get()
    public async getAll(@PaginationParams() { page = 1, perPage = 50 }: IPaginationParams) {
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
