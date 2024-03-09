import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConstructorResultsController } from '~modules/ConstructorResults/constructor-results.controller';
import { ConstructorResultsService } from '~modules/ConstructorResults/constructor-results.service';

import { ConstructorResults } from '~entities/ConstructorResults/ConstructorResults.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ConstructorResults])],
    controllers: [ConstructorResultsController],
    providers: [ConstructorResultsService],
})
export class ConstructorResultsModule {}
