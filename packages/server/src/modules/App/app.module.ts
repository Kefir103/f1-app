import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ENV_CONFIG } from '~config/Env.Config';

import { AppController } from '~modules/App/app.controller';

import { AppService } from '~modules/App/app.service';
import { DriverModule } from '~modules/Driver/driver.module';
import { CircuitModule } from '~modules/Circuit/circuit.module';
import { ConstructorModule } from '~modules/Constructor/constructor.module';
import { QualifyingModule } from '~modules/Qualifying/qualifying.module';
import { RaceModule } from '~modules/Race/race.module';
import { SeasonsModule } from '~modules/Seasons/seasons.module';

@Module({
    imports: [
        ConfigModule.forRoot(ENV_CONFIG),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            database: process.env.DATABASE_DB,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            entities: [],
            synchronize: true,
            autoLoadEntities: true,
        }),

        DriverModule,
        CircuitModule,
        ConstructorModule,
        QualifyingModule,
        RaceModule,
        SeasonsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
