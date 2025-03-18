import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { Race } from '~entities/Public/Race/Race.entity';

@Injectable()
export class RaceService {
    constructor(
        @InjectRepository(Race) private readonly raceRepository: Repository<Race>,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async getAll({
        page = 1,
        perPage = 10,
        relations = {},
    }: {
        page: number;
        perPage: number;
        relations?: FindOptionsRelations<Race>;
    }) {
        const races = await this.raceRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            order: {
                year: 'DESC',
                round: 'DESC',
            },
            relations: {
                circuit: true,
                ...relations,
            },
        });

        const count = await this.getCount();

        return {
            data: races,
            count: count,
        };
    }

    public async getOne(
        id: number,
        { relations = {} }: { relations?: FindOptionsRelations<Race> } = {},
    ) {
        const race = await this.raceRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                circuit: true,
                ...relations,
            },
        });

        if (!race) {
            return null;
        }

        return race;
    }

    public async getCount() {
        return await this.raceRepository.count();
    }
}
