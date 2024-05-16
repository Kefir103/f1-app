import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import { ResultType } from '~f1-app/shared/types/Result/Result.type';
import { QualifyingType } from '~f1-app/shared/types/Qualifying/Qualifying.type';
import { RaceType } from '~f1-app/shared/types/Race/Race.type';
import { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';

export const DriverMocks: DriverType[] = [
    {
        id: 1,
        ref: 'driver_1',
        number: 1,
        code: 'COD',
        first_name: 'first_name',
        last_name: 'last_name',
        date_of_birth: new Date(2024, 0, 1),
        nationality: 'nationality',
        wiki_url: 'wiki_1',

        wins_count: 0,
        poles_count: 0,
    },
    {
        id: 2,
        ref: 'driver_2',
        number: 2,
        code: 'COD',
        first_name: 'first_name',
        last_name: 'last_name',
        date_of_birth: new Date(2024, 0, 1),
        nationality: 'nationality',
        wiki_url: 'wiki_2',

        wins_count: 0,
        poles_count: 0,
    },
];

export const DriverResultsMock: ResultType[] = [
    {
        id: 1,
        race_id: 1,
        race: null,
        driver_id: DriverMocks[0].id,
        constructor_id: 1,
        driver_number: 1,
        position_start_grid: 1,
        position: 99,
        position_text: '',
        position_order: 1,
        points: 1,
        laps: 1,
        time_finish: '',
        time_milliseconds: 1,
        fastest_lap_number: 1,
        fastest_lap_rank: 1,
        fastest_lap_time: '',
        fastest_lap_speed: '',
        status_id: 1,
    },
    {
        id: 2,
        race_id: 1,
        race: null,
        driver_id: DriverMocks[1].id,
        constructor_id: 1,
        driver_number: 1,
        position_start_grid: 1,
        position: 99,
        position_text: '',
        position_order: 1,
        points: 1,
        laps: 1,
        time_finish: '',
        time_milliseconds: 1,
        fastest_lap_number: 1,
        fastest_lap_rank: 1,
        fastest_lap_time: '',
        fastest_lap_speed: '',
        status_id: 1,
    },
];

export const DriverQualifyingMock: QualifyingType[] = [
    {
        id: 1,
        race_id: 1,
        driver_id: DriverMocks[0].id,
        constructor_id: 1,
        driver_number: 1,
        driver_position: 99,
        q1_time: '',
        q2_time: '',
        q3_time: '',
    },
    {
        id: 2,
        race_id: 1,
        driver_id: DriverMocks[1].id,
        constructor_id: 1,
        driver_number: 1,
        driver_position: 99,
        q1_time: '',
        q2_time: '',
        q3_time: '',
    },
];

export const DriverRacesMock: Omit<RaceType, 'circuit'>[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        circuit_id: 1,
        year: index + 1,
        round: 1,
        name: `race_${index + 1}`,
        date: new Date(),
        start_time: '',
        wiki_url: `race_wiki_${index + 1}`,
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

export const DriverCircuitsMock: CircuitType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `circuit_${index + 1}`,
    name: `circuit_name_${index + 1}`,
    location: `circuit_location_${index + 1}`,
    country: `circuit_country_${index + 1}`,
    latitude: 1,
    longitude: 1,
    altitude: 1,
    wiki_url: `circuit_wiki_${index + 1}`,
}));
