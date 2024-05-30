import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CircuitService } from '~modules/Circuit/circuit.service';
import { CircuitController } from '~modules/Circuit/circuit.controller';

import { Circuit } from '~entities/Circuit/Circuit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Circuit])],
    controllers: [CircuitController],
    providers: [CircuitService],
})
export class CircuitModule {}
