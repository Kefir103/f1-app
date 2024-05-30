import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PitStopsController } from '~modules/PitStops/pit-stops.controller';
import { PitStopsService } from '~modules/PitStops/pit-stops.service';

import { PitStops } from '~entities/PitStops/PitStops.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PitStops])],
    controllers: [PitStopsController],
    providers: [PitStopsService],
})
export class PitStopsModule {}
