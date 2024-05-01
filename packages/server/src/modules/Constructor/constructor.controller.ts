import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';

import { ConstructorService } from '~modules/Constructor/constructor.service';

@Controller('constructor')
export class ConstructorController {
    constructor(private readonly constructorService: ConstructorService) {}

    @Get()
    public async getAll(@Query() { page = 1, perPage = 10 }) {
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
