import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceController } from '~modules/Race/race.controller';
import { RaceService } from '~modules/Race/race.service';

import { Race } from '~entities/Race/Race.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Race])],
    controllers: [RaceController],
    providers: [RaceService],
})
export class RaceModule {}
