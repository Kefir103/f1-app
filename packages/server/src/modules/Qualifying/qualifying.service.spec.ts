import { Test, TestingModule } from '@nestjs/testing';
import { QualifyingService } from '~modules/Qualifying/qualifying.service';

describe('QualifyingService', () => {
    let service: QualifyingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QualifyingService],
        }).compile();

        service = module.get<QualifyingService>(QualifyingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
