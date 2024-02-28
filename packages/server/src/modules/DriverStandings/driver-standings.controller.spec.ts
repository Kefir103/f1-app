import { Test, TestingModule } from '@nestjs/testing';
import { DriverStandingsController } from '~modules/DriverStandings/driver-standings.controller';

describe('DriverStandingsController', () => {
    let controller: DriverStandingsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DriverStandingsController],
        }).compile();

        controller = module.get<DriverStandingsController>(DriverStandingsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
