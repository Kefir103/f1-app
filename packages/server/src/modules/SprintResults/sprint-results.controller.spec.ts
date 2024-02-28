import { Test, TestingModule } from '@nestjs/testing';
import { SprintResultsController } from '~modules/SprintResults/sprint-results.controller';

describe('SprintResultsController', () => {
    let controller: SprintResultsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SprintResultsController],
        }).compile();

        controller = module.get<SprintResultsController>(SprintResultsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
