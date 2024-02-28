import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConstructorResultsController } from '~modules/ConstructorResults/constructor-results.controller';
import { ConstructorResultsService } from '~modules/ConstructorResults/constructor-results.service';
import { ConstructorResultsModelParseService } from '~modules/ConstructorResults/constructor-results.modelParseService';

import {
    ConstructorResults,
    ConstructorResultsSchema,
} from '~schemas/ConstructorResults/ConstructorResults.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ConstructorResults.name, schema: ConstructorResultsSchema },
        ]),
    ],
    exports: [ConstructorResultsModelParseService],
    controllers: [ConstructorResultsController],
    providers: [ConstructorResultsService, ConstructorResultsModelParseService],
})
export class ConstructorResultsModule {}
