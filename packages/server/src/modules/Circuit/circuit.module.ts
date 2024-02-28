import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CircuitService } from '~modules/Circuit/circuit.service';
import { CircuitModelParseService } from '~modules/Circuit/circuit.modelParseService';
import { CircuitController } from '~modules/Circuit/circuit.controller';

import { Circuit, CircuitSchema } from '~schemas/Circuit/Circuit.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Circuit.name, schema: CircuitSchema }])],
    exports: [CircuitModelParseService],
    controllers: [CircuitController],
    providers: [CircuitService, CircuitModelParseService],
})
export class CircuitModule {}
