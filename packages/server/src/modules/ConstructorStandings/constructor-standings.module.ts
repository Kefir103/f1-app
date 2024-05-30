import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConstructorStandingsService } from '~modules/ConstructorStandings/constructor-standings.service';
import { ConstructorStandingsController } from '~modules/ConstructorStandings/constructor-standings.controller';

import { ConstructorStandings } from '~entities/ConstructorStandings/ConstructorStandings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ConstructorStandings])],
    providers: [ConstructorStandingsService],
    controllers: [ConstructorStandingsController],
})
export class ConstructorStandingsModule {}
