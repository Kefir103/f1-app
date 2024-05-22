import { ResultTableFastestLapFormatter } from '~entities/result/ui';
import { ResultFastestLap } from '~entities/result/model';

describe('FastestLapFormatter', () => {
    it('should return best lap className', () => {
        const bestLapRank = ResultFastestLap.BEST_LAP_RANK;

        const bestLapClassName =
            ResultTableFastestLapFormatter.getFastestLapCellClassName(bestLapRank);

        const expectedBestLapClassName = 'dark:text-purple-500 text-purple-600';

        expect(bestLapClassName).toEqual(expectedBestLapClassName);
    });

    it("should return empty string if driver's fastest lap is not best", () => {
        const lapRank = -1;

        const lapClassName = ResultTableFastestLapFormatter.getFastestLapCellClassName(lapRank);

        const expectedLapClassName = '';

        expect(lapClassName).toEqual(expectedLapClassName);
    });
});
