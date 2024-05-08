import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeasonService } from '~modules/Season/season.service';
import { SeasonController } from '~modules/Season/season.controller';

import { Season } from '~entities/Season/Season.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Season])],
    providers: [SeasonService],
    controllers: [SeasonController],
})
export class SeasonModule {}
