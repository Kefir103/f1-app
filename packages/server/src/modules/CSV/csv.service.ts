import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { ICSVParseModelParseService } from '~lib/csv-parse/CSVParse.modelParseService';

import { DriverModelParseService } from '~modules/Driver/driver.modelParseService';
import { CircuitModelParseService } from '~modules/Circuit/circuit.modelParseService';
import { ConstructorResultsModelParseService } from '~modules/ConstructorResults/constructor-results.modelParseService';
import { ConstructorStandingsModelParseService } from '~modules/ConstructorStandings/constructor-standings.modelParseService';
import { ConstructorsModelParseService } from '~modules/Constructors/constructors.modelParseService';
import { DriverStandingsModelParseService } from '~modules/DriverStandings/driver-standings.modelParseService';
import { LapTimesModelParseService } from '~modules/LapTimes/lap-times.modelParseService';
import { PitStopsModelParseService } from '~modules/PitStops/pit-stops.modelParseService';
import { QualifyingModelParseService } from '~modules/Qualifying/qualifying.modelParseService';
import { RaceModelParseService } from '~modules/Race/race.modelParseService';
import { ResultsModelParseService } from '~modules/Results/results.modelParseService';
import { SprintResultsModelParseService } from '~modules/SprintResults/sprint-results.modelParseService';
import { SeasonsModelParseService } from '~modules/Seasons/seasons.modelParseService';
import { StatusModelParseService } from '~modules/Status/status.modelParseService';

interface IService extends ICSVParseModelParseService {}

const CSVParsingTimerLabel = 'CSVParsing';

@Injectable()
export class CsvService {
    private services: IService[] = [];

    constructor(
        @InjectConnection() private connection: Connection,

        private circuitModelParseService: CircuitModelParseService,
        private constructorResultsModelParseService: ConstructorResultsModelParseService,
        private constructorStandingsModelParseService: ConstructorStandingsModelParseService,
        private constructorsModelParseService: ConstructorsModelParseService,
        private driverModelParseService: DriverModelParseService,
        private driverStandingsModelParseService: DriverStandingsModelParseService,
        private lapTimesModelParseService: LapTimesModelParseService,
        private pitStopsModelParseService: PitStopsModelParseService,
        private qualifyingModelParseService: QualifyingModelParseService,
        private raceModelParseService: RaceModelParseService,
        private resultsModelParseService: ResultsModelParseService,
        private sprintResultsModelParseService: SprintResultsModelParseService,
        private seasonsModelParseService: SeasonsModelParseService,
        private statusModelParseService: StatusModelParseService,
    ) {
        this.pushModelParseServicesToServicesList(arguments);
    }

    public async parseCsv() {
        const session = await this.connection.startSession();

        try {
            session.startTransaction();

            console.log('CSVParsing start');
            console.time(CSVParsingTimerLabel);

            for (const service of this.services) {
                console.log(`${service.constructor.name} start`);
                console.time(service.constructor.name);

                await service.insertFromCsv();

                console.timeEnd(service.constructor.name);
            }

            await session.commitTransaction();

            console.log('CSVParsing success');
            console.timeEnd(CSVParsingTimerLabel);
        } catch (error) {
            await session.abortTransaction();

            console.log('Failed transaction', error.message);
        } finally {
            await session.endSession();
        }
    }

    private pushModelParseServicesToServicesList(services: IArguments) {
        for (const service of services) {
            if (this.isModelParseService(service)) {
                this.services.push(service);
            }
        }
    }

    private isModelParseService(service: any): service is ICSVParseModelParseService {
        return 'insertFromCsv' in service;
    }
}
