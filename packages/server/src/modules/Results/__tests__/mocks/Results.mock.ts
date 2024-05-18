import { ResultType } from '~f1-app/shared/types/Result/Result.type';

export const ResultsMock: Omit<ResultType, 'race'>[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: index + 1,
    driver_id: index + 1,
    constructor_id: index + 1,
    driver_number: index + 1,
    position_start_grid: index + 1,
    position: index + 1,
    position_text: `${index + 1}`,
    position_order: index + 1,
    points: 1,
    laps: 1,
    time_finish: '',
    time_milliseconds: 1,
    fastest_lap_number: index + 1,
    fastest_lap_rank: index + 1,
    fastest_lap_time: '',
    fastest_lap_speed: '',
    status_id: 1,
}));