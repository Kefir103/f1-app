import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorStandingsController } from '~modules/ConstructorStandings/constructor-standings.controller';

describe('ConstructorStandingsController', () => {
    let controller: ConstructorStandingsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConstructorStandingsController],
        }).compile();

        controller = module.get<ConstructorStandingsController>(ConstructorStandingsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
