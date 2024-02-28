import { Test, TestingModule } from '@nestjs/testing';
import { DriverStandingsService } from '~modules/DriverStandings/driver-standings.service';

describe('DriverStandingsService', () => {
    let service: DriverStandingsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DriverStandingsService],
        }).compile();

        service = module.get<DriverStandingsService>(DriverStandingsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
