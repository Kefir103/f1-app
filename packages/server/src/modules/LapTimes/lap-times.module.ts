import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LapTimesService } from '~modules/LapTimes/lap-times.service';
import { LapTimesController } from '~modules/LapTimes/lap-times.controller';
import { LapTimesModelParseService } from '~modules/LapTimes/lap-times.modelParseService';

import { LapTimes, LapTimesSchema } from '~schemas/LapTimes/LapTimes.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: LapTimes.name, schema: LapTimesSchema }])],
    exports: [LapTimesModelParseService],
    providers: [LapTimesService, LapTimesModelParseService],
    controllers: [LapTimesController],
})
export class LapTimesModule {}
