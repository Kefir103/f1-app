import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConstructorService } from '~modules/Constructor/constructor.service';
import { ConstructorController } from '~modules/Constructor/constructor.controller';

import { Constructor } from '~entities/Constructor/Constructor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Constructor])],
    providers: [ConstructorService],
    controllers: [ConstructorController],
})
export class ConstructorModule {}
