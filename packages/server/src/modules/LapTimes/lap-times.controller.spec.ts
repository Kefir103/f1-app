import { Test, TestingModule } from '@nestjs/testing';
import { LapTimesController } from '~modules/LapTimes/lap-times.controller';

describe('LapTimesController', () => {
    let controller: LapTimesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LapTimesController],
        }).compile();

        controller = module.get<LapTimesController>(LapTimesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
