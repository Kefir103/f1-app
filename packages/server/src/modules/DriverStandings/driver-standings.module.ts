import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DriverStandingsService } from '~modules/DriverStandings/driver-standings.service';
import { DriverStandingsController } from '~modules/DriverStandings/driver-standings.controller';
import { DriverStandingsModelParseService } from '~modules/DriverStandings/driver-standings.modelParseService';

import {
    DriverStandings,
    DriverStandingsSchema,
} from '~schemas/DriverStandings/DriverStandings.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: DriverStandings.name, schema: DriverStandingsSchema }]),
    ],
    exports: [DriverStandingsModelParseService],
    providers: [DriverStandingsService, DriverStandingsModelParseService],
    controllers: [DriverStandingsController],
})
export class DriverStandingsModule {}
