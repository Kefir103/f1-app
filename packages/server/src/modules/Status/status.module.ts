import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatusService } from '~modules/Status/status.service';
import { StatusController } from '~modules/Status/status.controller';
import { StatusModelParseService } from '~modules/Status/status.modelParseService';

import { Status, StatusSchema } from '~schemas/Status/Status.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }])],
    exports: [StatusModelParseService],
    providers: [StatusService, StatusModelParseService],
    controllers: [StatusController],
})
export class StatusModule {}
