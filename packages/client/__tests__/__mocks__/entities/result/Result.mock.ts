import type { Race } from '~entities/race';
import type { ResultType } from '~entities/result';
import type { CircuitType } from '~entities/circuit';
import type { DriverType } from '~entities/driver';

export const ResultsRaceMock: Race[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    circuit_id: 1,
    circuit: {} as CircuitType,
    year: 1,
    round: 1,
    name: `result_race_${index + 1}`,
    date: new Date(),
    start_time: null,
    wiki_url: `result_race_wiki_${index + 1}`,
}));

export const ResultsDriversMock: Omit<DriverType, 'constructor_entity'>[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `results_driver_ref_${index + 1}`,
    constructor_id: 1,
    number: index + 1,
    code: `results_driver_code_${index + 1}`,
    first_name: `results_driver_first_name_${index + 1}`,
    last_name: `results_driver_last_name_${index + 1}`,
    date_of_birth: new Date(),
    nationality: `results_driver_nationality_${index + 1}`,
    wiki_url: `results_driver_wiki_url_${index + 1}`,
    wins_count: 1,
    poles_count: 1,
}));

export const ResultsMock: ResultType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: 1,
    race: ResultsRaceMock.find((race) => race.id === 1)!,
    driver_id: 1,
    driver: ResultsDriversMock.find((driver) => driver.id === 1) as DriverType,
    constructor_id: 1,
    driver_number: 1,
    position_start_grid: 1,
    position: index + 1,
    position_text: `${index + 1}`,
    position_order: index + 1,
    points: index + 1,
    laps: 1,
    time_finish: '',
    time_milliseconds: 1,
    fastest_lap_number: 1,
    fastest_lap_rank: 1,
    fastest_lap_time: '',
    fastest_lap_speed: '',
    status_id: 1,
}));
