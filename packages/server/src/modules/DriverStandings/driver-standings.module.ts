import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverStandingsService } from '~modules/DriverStandings/driver-standings.service';
import { DriverStandingsController } from '~modules/DriverStandings/driver-standings.controller';

import { DriverStandings } from '~entities/DriverStandings/DriverStandings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DriverStandings])],
    providers: [DriverStandingsService],
    controllers: [DriverStandingsController],
})
export class DriverStandingsModule {}
