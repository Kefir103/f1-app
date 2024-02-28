import { Test, TestingModule } from '@nestjs/testing';
import { SprintResultsService } from '~modules/SprintResults/sprint-results.service';

describe('SprintResultsService', () => {
    let service: SprintResultsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SprintResultsService],
        }).compile();

        service = module.get<SprintResultsService>(SprintResultsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
