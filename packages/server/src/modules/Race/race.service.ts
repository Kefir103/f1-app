import { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Race } from '~entities/Race/Race.entity';

@Injectable()
export class RaceService {
    constructor(@InjectRepository(Race) private readonly raceRepository: Repository<Race>) {}

    public async getAll({
        page,
        perPage,
        where = {},
        relations = {},
        order = {},
    }: {
        page: number;
        perPage: number;
        where?: FindOptionsWhere<Race>;
        relations?: FindOptionsRelations<Race>;
        order?: FindOptionsOrder<Race>;
    }) {
        const races = await this.raceRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            where,
            order: {
                year: 'DESC',
                round: order.round || 'DESC',
            },
            relations: {
                circuit: true,
                ...relations,
            },
        });

        const count = await this.getCount({ where });

        return {
            data: races,
            count: count,
        };
    }

    public async getOne(id: number) {
        return await this.raceRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                circuit: true,
            },
        });
    }

    public async getCount({ where }: { where: FindOptionsWhere<Race> }) {
        return await this.raceRepository.count({ where });
    }
}
