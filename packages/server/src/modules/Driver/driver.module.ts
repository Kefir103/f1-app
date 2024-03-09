import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverController } from '~modules/Driver/driver.controller';
import { DriverService } from '~modules/Driver/driver.service';

import { Driver } from '~entities/Driver/Driver.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Driver])],
    providers: [DriverService],
    controllers: [DriverController],
})
export class DriverModule {}
