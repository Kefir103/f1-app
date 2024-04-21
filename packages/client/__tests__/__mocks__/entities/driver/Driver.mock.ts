import { DriverType } from '~entities/driver/type';

export const DriversMock: DriverType[] = [
    {
        id: 1,
        ref: 'driver_1',
        number: 1,
        code: 'COD',
        first_name: 'first_name_1',
        last_name: 'last_name_1',
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
        first_name: 'first_name_2',
        last_name: 'last_name_2',
        date_of_birth: new Date(2024, 0, 1),
        nationality: 'nationality',
        wiki_url: 'wiki_2',

        wins_count: 0,
        poles_count: 0,
    },
];
