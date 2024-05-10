import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Race } from '~entities/Race/Race.entity';

@Injectable()
export class RaceService {
    constructor(@InjectRepository(Race) private readonly raceRepository: Repository<Race>) {}

    public async getAll(page: number, perPage: number) {
        const races = await this.raceRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
        });

        const count = await this.getCount();

        return {
            data: races,
            count: count,
        };
    }

    public async getOne(id: number) {
        return await this.raceRepository.findOneBy({
            id: id,
        });
    }

    public async getCount() {
        return await this.raceRepository.count();
    }
}
