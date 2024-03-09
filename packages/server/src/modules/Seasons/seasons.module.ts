import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeasonsService } from '~modules/Seasons/seasons.service';
import { SeasonsController } from '~modules/Seasons/seasons.controller';

import { Season } from '~entities/Season/Season.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Season])],
    providers: [SeasonsService],
    controllers: [SeasonsController],
})
export class SeasonsModule {}
