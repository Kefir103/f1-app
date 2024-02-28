import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorResultsController } from '~modules/ConstructorResults/constructor-results.controller';

describe('ConstructorResultsController', () => {
    let controller: ConstructorResultsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConstructorResultsController],
        }).compile();

        controller = module.get<ConstructorResultsController>(ConstructorResultsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
