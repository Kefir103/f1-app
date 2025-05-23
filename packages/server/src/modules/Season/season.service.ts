import { FindOptionsWhere, Repository } from 'typeorm';
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
    }: {
        page: number;
        perPage: number;
        where?: FindOptionsWhere<Season>;
    }) {
        const seasons = await this.seasonRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            order: {
                year: 'DESC',
            },
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

    public async getOne(year: number) {
        return this.seasonRepository.findOneBy({ year });
    }

    private async getCount({ where = {} }: { where?: FindOptionsWhere<Season> } = {}) {
        return await this.seasonRepository.count({ where });
    }
}
