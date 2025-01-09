import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { IPaginationParams, PaginationParams } from '~decorators/pagination/Pagination.decorator';

import { ConstructorService } from '~modules/Constructor/constructor.service';

@Controller('constructor')
export class ConstructorController {
    constructor(private readonly constructorService: ConstructorService) {}

    @Get()
    public async getAll(@PaginationParams() { page = 1, perPage = 50 }: IPaginationParams) {
        return await this.constructorService.getAll(page, perPage);
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
