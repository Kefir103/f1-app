import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Constructor } from '~entities/Constructor/Constructor.entity';

@Injectable()
export class ConstructorService {
    constructor(
        @InjectRepository(Constructor) private constructorRepository: Repository<Constructor>,
    ) {}

    public async getAll(page: number, perPage: number) {
        const constructors = await this.constructorRepository.find({
            skip: (page - 1) * perPage,
            take: perPage,
        });

        const count = await this.getCount();

        return {
            data: constructors,
            count: count,
        };
    }

    public async getOne(ref: string) {
        return await this.constructorRepository.findOneBy({ ref: ref });
    }

    public async getCount() {
        return await this.constructorRepository.count();
    }
}
