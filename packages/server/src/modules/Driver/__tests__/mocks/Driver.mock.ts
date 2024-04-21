import { DriverType } from '~f1-app/shared/types/Driver/Driver.type';

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
        wiki_url: 'wiki',

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
        wiki_url: 'wiki',

        wins_count: 0,
        poles_count: 0,
    },
];
