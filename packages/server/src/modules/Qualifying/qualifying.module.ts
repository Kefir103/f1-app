import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QualifyingController } from '~modules/Qualifying/qualifying.controller';
import { QualifyingService } from '~modules/Qualifying/qualifying.service';
import { QualifyingModelParseService } from '~modules/Qualifying/qualifying.modelParseService';

import { Qualifying, QualifyingSchema } from '~schemas/Qualifying/Qualifying.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Qualifying.name, schema: QualifyingSchema }])],
    exports: [QualifyingModelParseService],
    controllers: [QualifyingController],
    providers: [QualifyingService, QualifyingModelParseService],
})
export class QualifyingModule {}
