import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SprintResultsController } from '~modules/SprintResults/sprint-results.controller';
import { SprintResultsService } from '~modules/SprintResults/sprint-results.service';
import { SprintResultsModelParseService } from '~modules/SprintResults/sprint-results.modelParseService';

import { SprintResult, SprintResultSchema } from '~schemas/SprintResult/SprintResult.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: SprintResult.name, schema: SprintResultSchema }])],
    exports: [SprintResultsModelParseService],
    controllers: [SprintResultsController],
    providers: [SprintResultsService, SprintResultsModelParseService],
})
export class SprintResultsModule {}
