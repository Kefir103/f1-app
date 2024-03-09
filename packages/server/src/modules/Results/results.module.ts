import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultsController } from '~modules/Results/results.controller';
import { ResultsService } from '~modules/Results/results.service';

import { Result } from '~entities/Result/Result.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Result])],
    controllers: [ResultsController],
    providers: [ResultsService],
})
export class ResultsModule {}
