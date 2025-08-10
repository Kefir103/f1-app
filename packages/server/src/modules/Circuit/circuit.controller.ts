import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';
import { FilterParams } from '~decorators/filter/Filter.decorator';

import { Circuit } from '~entities/Public/Circuit/Circuit.entity';

import { CircuitService } from '~modules/Circuit/circuit.service';

@Controller('circuit')
export class CircuitController {
    constructor(private circuitService: CircuitService) {}

    @Get()
    public async getAll(
        @PaginationParams() { page = 1, perPage = 50 }: IPaginationParams,
        @FilterParams(Circuit) filters: FindOptionsWhere<Circuit> = {},
    ) {
        return await this.circuitService.getAll({ page, perPage, where: filters });
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
