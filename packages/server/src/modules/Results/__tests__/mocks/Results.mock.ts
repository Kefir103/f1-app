import type { ResultType } from '~f1-app/shared/types/Result/Result.type';
import type { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import type { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';

export const ResultsDriversMock: DriverType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `driver_ref_${index + 1}`,
    constructor_id: index + 1,
    constructor_entity: {} as ConstructorType,
    number: null,
    code: `driver_code_${index + 1}`,
    first_name: `driver_first_name_${index + 1}`,
    last_name: `driver_last_name_${index + 1}`,
    date_of_birth: new Date(),
    nationality: `driver_nationality_${index + 1}`,
    wiki_url: `driver_wiki_url_${index + 1}`,

    wins_count: 0,
    poles_count: 0,
}));

export const ResultsMock: Omit<ResultType, 'race' | 'driver'>[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: index + 1,
    driver_id: index + 1,
    // driver: ResultsDriversMock.find((driver) => driver.id === index + 1),
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
