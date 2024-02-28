import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeasonsService } from '~modules/Seasons/seasons.service';
import { SeasonsController } from '~modules/Seasons/seasons.controller';
import { SeasonsModelParseService } from '~modules/Seasons/seasons.modelParseService';

import { Season, SeasonSchema } from '~schemas/Season/Season.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }])],
    exports: [SeasonsModelParseService],
    providers: [SeasonsService, SeasonsModelParseService],
    controllers: [SeasonsController],
})
export class SeasonsModule {}
