import type { Race } from '~entities/race';
import type { CircuitType } from '~entities/circuit';
import type { ResultType } from '~entities/result';
import type { DriverType } from '~entities/driver';
import type { Constructor } from '~entities/constructor';
import type { StatusType } from '~entities/status';
import type { SeasonType } from '~entities/season';

const RacesCircuitMock: CircuitType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    name: `circuit_name_${index + 1}`,
    ref: `circuit_ref_${index + 1}`,
    location: `circuit_location_${index + 1}`,
    longitude: 1,
    altitude: 1,
    wiki_url: `circuit_wiki_${index + 1}`,
    country: `circuit_country_${index + 1}`,
    latitude: 1,
}));

const RacesSeasonsMock: SeasonType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    year: index + 1,
    wiki_url: `races_season_wiki_url_${index + 1}`,
}));

export const RacesMock: Race[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    circuit_id: 1,
    circuit: RacesCircuitMock.find((circuit) => circuit.id === index + 1)!,
    year: index + 1,
    season: RacesSeasonsMock.find((season) => season.year === index + 1)!,
    round: 1,
    name: `name_${index + 1}`,
    date: new Date(),
    start_time: '',
    wiki_url: `wiki_${index + 1}`,
    fp1_date: new Date(),
    fp1_time: '',
    fp2_date: new Date(),
    fp2_time: '',
    fp3_date: new Date(),
    fp3_time: '',
    qualifying_date: new Date(),
    qualifying_time: '',
    sprint_date: new Date(),
    sprint_time: '',
}));

export const RacesResultsDriversMock: Omit<DriverType, 'constructor_entity'>[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
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

export const RacesResultsConstructorsMock: Constructor[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        ref: `race_results_constructor_ref_${index + 1}`,
        name: `race_results_constructor_name_${index + 1}`,
        nationality: `race_results_constructor_nationality_${index + 1}`,
        wiki_url: `race_results_constructor_wiki_${index + 1}`,
    }));

export const RacesResultsStatusesMock: StatusType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    status: `races_results_status_${index + 1}`,
}));

export const RacesResultsMock: ResultType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: 1,
    race: RacesMock.find((race) => race.id === 1) as Race,
    driver_id: index + 1,
    driver: RacesResultsDriversMock.find((driver) => driver.id === index + 1) as DriverType,
    constructor_id: index + 1,
    constructor_entity: RacesResultsConstructorsMock.find(
        (constructor) => constructor.id === index + 1,
    ) as Constructor,
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
    status: RacesResultsStatusesMock.find((status) => status.id === 1) as StatusType,
}));
