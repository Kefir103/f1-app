import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Constructor } from '~entities/Public/Constructor/Constructor.entity';

@Injectable()
export class ConstructorService {
    constructor(
        @InjectRepository(Constructor) private constructorRepository: Repository<Constructor>,
    ) {}

    public async getAll({
        page,
        perPage,
        where = {},
    }: {
        page: number;
        perPage: number;
        where?: FindOptionsWhere<Constructor>;
    }) {
        const constructors = await this.constructorRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            ...(where && {
                where,
            }),
        });

        const count = await this.getCount({ where });

        return {
            data: constructors,
            count: count,
        };
    }

    public async getOne(ref: string) {
        return await this.constructorRepository.findOneBy({ ref: ref });
    }

    public async getCount({ where = {} }: { where?: FindOptionsWhere<Constructor> } = {}) {
        return await this.constructorRepository.count({ where });
    }
}
