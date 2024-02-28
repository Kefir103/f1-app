import { Module } from '@nestjs/common';
import { CsvService } from '~modules/CSV/csv.service';
import { CsvController } from '~modules/CSV/csv.controller';

import { DriverModule } from '~modules/Driver/driver.module';
import { CircuitModule } from '~modules/Circuit/circuit.module';
import { ConstructorResultsModule } from '~modules/ConstructorResults/constructor-results.module';
import { ConstructorStandingsModule } from '~modules/ConstructorStandings/constructor-standings.module';
import { ConstructorsModule } from '~modules/Constructors/constructors.module';
import { DriverStandingsModule } from '~modules/DriverStandings/driver-standings.module';
import { LapTimesModule } from '~modules/LapTimes/lap-times.module';
import { PitStopsModule } from '~modules/PitStops/pit-stops.module';
import { QualifyingModule } from '~modules/Qualifying/qualifying.module';
import { RaceModule } from '~modules/Race/race.module';
import { ResultsModule } from '~modules/Results/results.module';
import { SprintResultsModule } from '~modules/SprintResults/sprint-results.module';
import { SeasonsModule } from '~modules/Seasons/seasons.module';
import { StatusModule } from '~modules/Status/status.module';

@Module({
    imports: [
        CircuitModule,
        ConstructorResultsModule,
        ConstructorStandingsModule,
        ConstructorsModule,
        DriverModule,
        DriverStandingsModule,
        LapTimesModule,
        PitStopsModule,
        QualifyingModule,
        RaceModule,
        ResultsModule,
        SprintResultsModule,
        SeasonsModule,
        StatusModule,
    ],
    providers: [CsvService],
    controllers: [CsvController],
})
export class CsvModule {}
