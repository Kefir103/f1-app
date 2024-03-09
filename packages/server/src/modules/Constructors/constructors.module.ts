import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConstructorsService } from '~modules/Constructors/constructors.service';
import { ConstructorsController } from '~modules/Constructors/constructors.controller';

import { Constructor } from '~entities/Constructor/Constructor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Constructor])],
    providers: [ConstructorsService],
    controllers: [ConstructorsController],
})
export class ConstructorsModule {}
