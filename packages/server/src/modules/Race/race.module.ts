import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceController } from '~modules/Race/race.controller';
import { RaceService } from '~modules/Race/race.service';

import { Race } from '~entities/Race/Race.entity';

import { ResultsModule } from '~modules/Results/results.module';

@Module({
    imports: [TypeOrmModule.forFeature([Race]), ResultsModule],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [TypeOrmModule.forFeature([Race]), RaceService],
})
export class RaceModule {}
