import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Season } from '~entities/Public/Season/Season.entity';

@Injectable()
export class SeasonService {
    constructor(@InjectRepository(Season) private seasonRepository: Repository<Season>) {}

    public async getAll({
        page,
        perPage,
        where = {},
        relations,
    }: {
        page: number;
        perPage: number;
        where?: FindOptionsWhere<Season>;
        relations?: FindOptionsRelations<Season>;
    }) {
        const seasons = await this.seasonRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            order: {
                year: 'DESC',
            },
            ...(relations && {
                relations,
            }),
            ...(where && {
                where,
            }),
        });

        const count = await this.getCount({ where });

        return {
            data: seasons,
            count: count,
        };
    }

    public async getOne(
        year: number,
        {
            relations,
        }: {
            relations?: FindOptionsRelations<Season>;
        },
    ) {
        return this.seasonRepository.findOne({
            where: {
                year,
            },
            ...(relations && {
                relations,
            }),
        });
    }

    private async getCount({ where = {} }: { where?: FindOptionsWhere<Season> } = {}) {
        return await this.seasonRepository.count({ where });
    }
}
