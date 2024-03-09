import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusService } from '~modules/Status/status.service';
import { StatusController } from '~modules/Status/status.controller';

import { Status } from '~entities/Status/Status.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Status])],
    providers: [StatusService],
    controllers: [StatusController],
})
export class StatusModule {}
