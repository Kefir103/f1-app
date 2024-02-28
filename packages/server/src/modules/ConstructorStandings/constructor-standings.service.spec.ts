import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorStandingsService } from '~modules/ConstructorStandings/constructor-standings.service';

describe('ConstructorStandingsService', () => {
    let service: ConstructorStandingsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConstructorStandingsService],
        }).compile();

        service = module.get<ConstructorStandingsService>(ConstructorStandingsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
