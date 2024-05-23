import { ResultFastestLap } from '~entities/result/model';

export const ResultTableFastestLapFormatter = {
    getFastestLapCellClassName: (fastestLapRank?: number) =>
        fastestLapRank === ResultFastestLap.BEST_LAP_RANK
            ? 'dark:text-purple-500 text-purple-600'
            : '',
};
