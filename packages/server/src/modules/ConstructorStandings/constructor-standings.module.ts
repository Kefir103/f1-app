import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConstructorStandingsService } from '~modules/ConstructorStandings/constructor-standings.service';
import { ConstructorStandingsController } from '~modules/ConstructorStandings/constructor-standings.controller';
import { ConstructorStandingsModelParseService } from '~modules/ConstructorStandings/constructor-standings.modelParseService';

import {
    ConstructorStandings,
    ConstructorStandingsSchema,
} from '~schemas/ConstructorStandings/ConstructorStandings.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ConstructorStandings.name, schema: ConstructorStandingsSchema },
        ]),
    ],
    exports: [ConstructorStandingsModelParseService],
    providers: [ConstructorStandingsService, ConstructorStandingsModelParseService],
    controllers: [ConstructorStandingsController],
})
export class ConstructorStandingsModule {}
