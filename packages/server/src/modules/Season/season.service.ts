import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Season } from '~entities/Season/Season.entity';

@Injectable()
export class SeasonService {
    constructor(@InjectRepository(Season) private seasonRepository: Repository<Season>) {}

    public async getAll(page: number, perPage: number) {
        const seasons = await this.seasonRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            order: {
                year: 'DESC',
            },
        });

        const count = await this.getCount();

        return {
            data: seasons,
            count: count,
        };
    }

    public async getOne(year: number) {
        return this.seasonRepository.findOneBy({ year });
    }

    private async getCount() {
        return await this.seasonRepository.count();
    }
}
