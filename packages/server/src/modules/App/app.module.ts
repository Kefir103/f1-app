import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from '~modules/App/app.controller';

import { AppService } from '~modules/App/app.service';
import { DriverModule } from '~modules/Driver/driver.module';
import { CsvModule } from '~modules/CSV/csv.module';
import { CircuitModule } from '~modules/Circuit/circuit.module';
import { ConstructorsModule } from '~modules/Constructors/constructors.module';
import { QualifyingModule } from '~modules/Qualifying/qualifying.module';
import { RaceModule } from '~modules/Race/race.module';
import { SeasonsModule } from '~modules/Seasons/seasons.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/f1-app'),
        DriverModule,
        CsvModule,
        CircuitModule,
        ConstructorsModule,
        QualifyingModule,
        RaceModule,
        SeasonsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
