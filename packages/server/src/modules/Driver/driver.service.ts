import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Driver } from '~entities/Driver/Driver.entity';

@Injectable()
export class DriverService {
    constructor(@InjectRepository(Driver) private driverRepository: Repository<Driver>) {}

    public async getAll(page: number, perPage: number) {
        const drivers = await this.driverRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            relations: {
                constructor_entity: true,
            },
        });

        const count = await this.getCount();

        return {
            count: count,
            data: drivers,
        };
    }

    public async getOne(ref: string) {
        return await this.driverRepository.findOne({
            where: {
                ref: ref,
            },
            relations: {
                constructor_entity: true,
            },
        });
    }

    public async getCount() {
        return await this.driverRepository.count();
    }
}
