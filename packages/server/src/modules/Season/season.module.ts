import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeasonService } from '~modules/Season/season.service';
import { SeasonController } from '~modules/Season/season.controller';

import { Season } from '~entities/Season/Season.entity';

import { RaceModule } from '~modules/Race/race.module';

@Module({
    imports: [TypeOrmModule.forFeature([Season]), RaceModule],
    providers: [SeasonService],
    controllers: [SeasonController],
})
export class SeasonModule {}
