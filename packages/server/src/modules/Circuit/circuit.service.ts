import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Circuit } from '~entities/Circuit/Circuit.entity';

@Injectable()
export class CircuitService {
    constructor(@InjectRepository(Circuit) private circuitRepository: Repository<Circuit>) {}

    public async getAll(page: number, perPage: number) {
        const data = await this.circuitRepository.find({
            take: perPage,
            skip: (page - 1) * perPage,
        });

        const count = await this.getCount();

        return {
            data: data,
            count: count,
        };
    }

    public async getOne(ref: string) {
        return await this.circuitRepository.findOneBy({ ref: ref });
    }

    private async getCount() {
        return await this.circuitRepository.count();
    }
}
