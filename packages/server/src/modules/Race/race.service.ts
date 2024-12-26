import { DataSource, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { Race } from '~entities/Public/Race/Race.entity';
import { Driver } from '~entities/Public/Driver/Driver.entity';

@Injectable()
export class RaceService {
    constructor(
        @InjectRepository(Race) private readonly raceRepository: Repository<Race>,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async getAll(page: number, perPage: number) {
        let races = await this.raceRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
            order: {
                year: 'DESC',
                round: 'DESC',
            },
            relations: {
                circuit: true,
            },
        });

        const count = await this.getCount();

        const winners = await this.getWinners(races.map(({ winner_id }) => winner_id));

        races = races.map((race) => ({
            ...race,
            winner: winners?.find((driver) => driver.id === race.winner_id) || null,
        }));

        return {
            data: races,
            count: count,
        };
    }

    public async getOne(id: number) {
        const race = await this.raceRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                circuit: true,
            },
        });

        if (!race) {
            return null;
        }

        const [winner] = await this.getWinners([race.winner_id]);

        race.winner = winner || null;

        return race;
    }

    public async getCount() {
        return await this.raceRepository.count();
    }

    public async getWinners(winnersIds: number[]) {
        return await this.dataSource.getRepository(Driver).find({
            select: {
                id: true,
                ref: true,
                first_name: true,
                last_name: true,
                constructor_entity: {
                    id: true,
                    ref: true,
                    name: true,
                },
            },
            where: {
                id: In(winnersIds),
            },
            relations: {
                constructor_entity: true,
            },
        });
    }
}
