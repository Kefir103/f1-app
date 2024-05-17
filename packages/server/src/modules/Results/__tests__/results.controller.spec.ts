import { Test, TestingModule } from '@nestjs/testing';
import { ResultsController } from '~modules/Results/results.controller';

describe('ResultsController', () => {
    let controller: ResultsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ResultsController],
        }).compile();

        controller = module.get<ResultsController>(ResultsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
