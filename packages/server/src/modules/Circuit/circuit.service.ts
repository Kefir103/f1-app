import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Circuit } from '~entities/Public/Circuit/Circuit.entity';

@Injectable()
export class CircuitService {
    constructor(@InjectRepository(Circuit) private circuitRepository: Repository<Circuit>) {}

    public async getAll({
        page,
        perPage,
        where = {},
    }: {
        page: number;
        perPage: number;
        where?: FindOptionsWhere<Circuit>;
    }) {
        const data = await this.circuitRepository.find({
            take: perPage,
            skip: (page - 1) * perPage,
            ...(where && {
                where,
            }),
        });

        const count = await this.getCount({ where });

        return {
            data: data,
            count: count,
        };
    }

    public async getOne(ref: string) {
        return await this.circuitRepository.findOneBy({ ref: ref });
    }

    private async getCount({ where = {} }: { where?: FindOptionsWhere<Circuit> }) {
        return await this.circuitRepository.count({ where });
    }
}
