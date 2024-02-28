import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RaceController } from '~modules/Race/race.controller';
import { RaceService } from '~modules/Race/race.service';
import { RaceModelParseService } from '~modules/Race/race.modelParseService';

import { Race, RaceSchema } from '~schemas/Race/Race.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Race.name, schema: RaceSchema }])],
    exports: [RaceModelParseService],
    controllers: [RaceController],
    providers: [RaceService, RaceModelParseService],
})
export class RaceModule {}
