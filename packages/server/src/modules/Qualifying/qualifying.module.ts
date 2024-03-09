import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QualifyingController } from '~modules/Qualifying/qualifying.controller';
import { QualifyingService } from '~modules/Qualifying/qualifying.service';

import { Qualifying } from '~entities/Qualifying/Qualifying.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Qualifying])],
    controllers: [QualifyingController],
    providers: [QualifyingService],
})
export class QualifyingModule {}
