import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import { ResultType } from '~f1-app/shared/types/Result/Result.type';
import { QualifyingType } from '~f1-app/shared/types/Qualifying/Qualifying.type';

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
