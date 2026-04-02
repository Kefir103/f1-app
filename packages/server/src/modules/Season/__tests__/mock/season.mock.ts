import { SeasonType } from '~f1-app/shared/types/Season/Season.type';
import { SeasonWinnerDriverType } from '~f1-app/shared/types/Season/winner/SeasonWinnerDriver';
import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';
import { StatusType } from '~f1-app/shared/types/Status/Status.type';
import { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';
import { RaceType } from '~f1-app/shared/types/Race/Race.type';
import { ResultType } from '~f1-app/shared/types/Result/Result.type';
import { DriverStandingsType } from '~f1-app/shared/types/DriverStandings/DriverStandings.type';

export const SeasonsMock: SeasonType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    year: index + 1,
    wiki_url: `wiki_${index + 1}`,
}));

export const SeasonsDriversMock: DriverType[] = new Array(2).fill(null).map(
    (_, index) =>
        ({
            id: index + 1,
            ref: `driver_ref_${index + 1}`,
            code: `driver_code_${index + 1}`,
            number: index + 1,
            nationality: `driver_nationality_${index + 1}`,
            date_of_birth: new Date(100000),
            first_name: `driver_first_name_${index + 1}`,
            last_name: `driver_last_name_${index + 1}`,
            wiki_url: `driver_wiki_url_${index + 1}`,
            constructor_id: index + 1,
        }) as DriverType,
);

export const SeasonsConstructorsMock: ConstructorType[] = new Array(2).fill(null).map(
    (_, index) =>
        ({
            id: index + 1,
            ref: `constructor_ref_${index + 1}`,
            nationality: `constructor_nationality_${index + 1}`,
            name: `constructor_name_${index + 1}`,
            wiki_url: `constructor_wiki_url_${index + 1}`,
        }) as ConstructorType,
);

export const SeasonsDriverWinnerMock: SeasonWinnerDriverType[] = new Array(1)
    .fill(null)
    .map((_, index) => ({
        year: index + 1,
        season: SeasonsMock.find(({ year }) => year === index + 1),
        driver_id: index + 1,
        driver: SeasonsDriversMock.find(({ id }) => id === index + 1),
        constructor_id: index + 1,
        constructor_entity: SeasonsConstructorsMock.find(({ id }) => id === index + 1),
    }));

export const SeasonsStatusMock: StatusType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    status: `status_${index + 1}`,
}));

export const SeasonsCircuitsMock: CircuitType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `circuit_ref_${index + 1}`,
    name: `circuit_name_${index + 1}`,
    country: `circuit_country_${index + 1}`,
    location: `circuit_location_${index + 1}`,
    longitude: index,
    altitude: index,
    latitude: index,
    wiki_url: `wiki_${index + 1}`,
}));

let raceId = 1;

export const SeasonsRacesMock: RaceType[] = SeasonsMock.map((season, index) => {
    return new Array(2).fill(null).map((_, raceIndex) => ({
        id: raceId++,
        name: `race_name_${index + 1}`,
        circuit_id: raceIndex + 1,
        circuit: SeasonsCircuitsMock.find(({ id }) => id === raceIndex + 1),
        year: season.year,
        date: new Date('2025-01-01'),
        round: index + 1,
        wiki_url: `wiki_${index + 1}`,
        fp1_date: new Date('2025-01-01'),
        fp1_time: '2025-01-01',
        fp2_date: new Date('2025-01-01'),
        fp2_time: '2025-01-01',
        fp3_date: new Date('2025-01-01'),
        fp3_time: '2025-01-01',
        start_time: '2025-01-01',
        qualifying_date: new Date('2025-01-01'),
        qualifying_time: '2025-01-01',
        sprint_date: null,
        sprint_time: null,
    }));
}).flat(Infinity) as RaceType[];

export const SeasonsResultsMock: ResultType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: index + 1,
    race: SeasonsRacesMock.find(({ id }) => id === index + 1),
    constructor_id: 1,
    constructor_entity: SeasonsConstructorsMock.find(({ id }) => id === 1),
    driver_id: 1,
    driver: SeasonsDriversMock.find(({ id }) => id === 1),
    status_id: 1,
    status: SeasonsStatusMock.find(({ id }) => id === 1),
    position: 1,
    position_order: 1,
    position_start_grid: 1,
    position_text: '1',
    points: index + 1,
    laps: 0,
}));

export const SeasonsDriverStandingsMock: DriverStandingsType[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        driver_id: 1,
        points: 0,
        position: 1,
        position_text: '1',
        race_id: index + 1,
        wins_count: 0,
    }));
