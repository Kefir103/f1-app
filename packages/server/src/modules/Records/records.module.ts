import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecordsService } from '~modules/Records/records.service';

import { DriverWinsCount } from '~entities/Records/DriverWinsCount/DriverWinsCount.entity';
import { DriverPolesCount } from '~entities/Records/DriverPolesCount/DriverPolesCount.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DriverWinsCount, DriverPolesCount])],
    providers: [RecordsService],
})
export class RecordsModule {}
