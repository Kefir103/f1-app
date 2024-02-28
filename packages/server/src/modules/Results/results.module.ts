import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ResultsController } from '~modules/Results/results.controller';
import { ResultsService } from '~modules/Results/results.service';
import { ResultsModelParseService } from '~modules/Results/results.modelParseService';

import { Result, ResultSchema } from '~schemas/Result/Result.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }])],
    exports: [ResultsModelParseService],
    controllers: [ResultsController],
    providers: [ResultsService, ResultsModelParseService],
})
export class ResultsModule {}
