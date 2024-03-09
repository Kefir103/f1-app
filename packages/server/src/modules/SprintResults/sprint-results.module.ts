import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SprintResultsController } from '~modules/SprintResults/sprint-results.controller';
import { SprintResultsService } from '~modules/SprintResults/sprint-results.service';

import { SprintResult } from '~entities/SprintResult/SprintResult.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SprintResult])],
    controllers: [SprintResultsController],
    providers: [SprintResultsService],
})
export class SprintResultsModule {}
