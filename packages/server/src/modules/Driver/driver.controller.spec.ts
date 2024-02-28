import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from '~modules/Driver/driver.controller';

describe('DriverController', () => {
    let controller: DriverController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DriverController],
        }).compile();

        controller = module.get<DriverController>(DriverController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
