import { FindManyOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Result } from '~entities/Result/Result.entity';

@Injectable()
export class ResultsService {
    constructor(@InjectRepository(Result) private readonly resultsRepository: Repository<Result>) {}

    public async getAll({
        where,
        relations,
    }: {
        where: FindOptionsWhere<Result>;
        relations?: FindOptionsRelations<Result>;
    }) {
        const data = await this.resultsRepository.find({
            where,
            relations,
        });

        const count = await this.getCount({
            where,
        });

        return {
            data: data,
            count: count,
        };
    }

    public async getCount(options?: FindManyOptions<Result>) {
        return await this.resultsRepository.count(options || null);
    }
}
