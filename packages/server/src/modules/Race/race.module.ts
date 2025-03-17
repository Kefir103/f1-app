import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceController } from '~modules/Race/race.controller';
import { RaceService } from '~modules/Race/race.service';

import { Race } from '~entities/Public/Race/Race.entity';
import { RaceWinner } from '~entities/Public/Race/Winner/RaceWinner.entity';

import { ResultsModule } from '~modules/Results/results.module';

@Module({
    imports: [TypeOrmModule.forFeature([RaceWinner, Race]), ResultsModule],
    controllers: [RaceController],
    providers: [RaceService],
})
export class RaceModule {}
