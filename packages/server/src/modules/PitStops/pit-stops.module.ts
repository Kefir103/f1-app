import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PitStopsController } from '~modules/PitStops/pit-stops.controller';
import { PitStopsService } from '~modules/PitStops/pit-stops.service';
import { PitStopsModelParseService } from '~modules/PitStops/pit-stops.modelParseService';

import { PitStops, PitStopsSchema } from '~schemas/PitStops/PitStops.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: PitStops.name, schema: PitStopsSchema }])],
    exports: [PitStopsModelParseService],
    controllers: [PitStopsController],
    providers: [PitStopsService, PitStopsModelParseService],
})
export class PitStopsModule {}
