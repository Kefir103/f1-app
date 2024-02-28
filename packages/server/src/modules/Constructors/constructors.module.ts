import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConstructorsService } from '~modules/Constructors/constructors.service';
import { ConstructorsController } from '~modules/Constructors/constructors.controller';
import { ConstructorsModelParseService } from '~modules/Constructors/constructors.modelParseService';

import { Constructor, ConstructorSchema } from '~schemas/Constructor/Constructor.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Constructor.name, schema: ConstructorSchema }])],
    exports: [ConstructorsModelParseService],
    providers: [ConstructorsService, ConstructorsModelParseService],
    controllers: [ConstructorsController],
})
export class ConstructorsModule {}
