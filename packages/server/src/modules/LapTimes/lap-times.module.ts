import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LapTimesService } from '~modules/LapTimes/lap-times.service';
import { LapTimesController } from '~modules/LapTimes/lap-times.controller';

import { LapTimes } from '~entities/LapTimes/LapTimes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LapTimes])],
    providers: [LapTimesService],
    controllers: [LapTimesController],
})
export class LapTimesModule {}
