import type { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import type { ResultType } from '~f1-app/shared/types/Result/Result.type';
import type { QualifyingType } from '~f1-app/shared/types/Qualifying/Qualifying.type';
import type { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';

export const DriverConstructorMock: ConstructorType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `constructor_ref_${index + 1}`,
    nationality: `constructor_nationality_${index + 1}`,
    wiki_url: `constructor_wiki_url_${index + 1}`,
    name: `constructor_name_${index + 1}`,
}));

export const DriverMocks: Omit<DriverType, 'constructor_entity'>[] = [
    {
        id: 1,
        ref: 'driver_1',
        constructor_id: 1,
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
        constructor_id: 1,
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
