import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DriverController } from '~modules/Driver/driver.controller';
import { DriverService } from '~modules/Driver/driver.service';
import { DriverModelParseService } from '~modules/Driver/driver.modelParseService';

import { Driver, DriverSchema } from '~schemas/Driver/Driver.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])],
    exports: [DriverModelParseService],
    providers: [DriverService, DriverModelParseService],
    controllers: [DriverController],
})
export class DriverModule {}
