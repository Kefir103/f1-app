import { Test, TestingModule } from '@nestjs/testing';
import { PitStopsController } from '~modules/PitStops/pit-stops.controller';

describe('PitStopsController', () => {
    let controller: PitStopsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PitStopsController],
        }).compile();

        controller = module.get<PitStopsController>(PitStopsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
