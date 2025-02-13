import { FindOptionsRelations, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Driver } from '~entities/Public/Driver/Driver.entity';

@Injectable()
export class DriverService {
    constructor(@InjectRepository(Driver) private driverRepository: Repository<Driver>) {}

    public async getAll({
        page,
        perPage,
        relations = {},
    }: {
        page: number;
        perPage: number;
        relations?: FindOptionsRelations<Driver>;
    }) {
        const drivers = await this.driverRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            relations: {
                wins_count: true,
                poles_count: true,
                ...relations,
            },
        });

        const count = await this.getCount();

        return {
            count: count,
            data: drivers,
        };
    }

    public async getOne(
        ref: string,
        { relations = {} }: { relations?: FindOptionsRelations<Driver> } = {},
    ) {
        return await this.driverRepository.findOne({
            where: {
                ref: ref,
            },
            relations: {
                wins_count: true,
                poles_count: true,
                ...relations,
            },
        });
    }

    public async getCount() {
        return await this.driverRepository.count();
    }
}
