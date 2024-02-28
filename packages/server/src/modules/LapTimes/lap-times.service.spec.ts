import { Test, TestingModule } from '@nestjs/testing';
import { LapTimesService } from '~modules/LapTimes/lap-times.service';

describe('LapTimesService', () => {
    let service: LapTimesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LapTimesService],
        }).compile();

        service = module.get<LapTimesService>(LapTimesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
