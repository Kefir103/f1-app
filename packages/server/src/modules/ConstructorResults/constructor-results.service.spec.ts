import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorResultsService } from '~modules/ConstructorResults/constructor-results.service';

describe('ConstructorResultsService', () => {
    let service: ConstructorResultsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConstructorResultsService],
        }).compile();

        service = module.get<ConstructorResultsService>(ConstructorResultsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
