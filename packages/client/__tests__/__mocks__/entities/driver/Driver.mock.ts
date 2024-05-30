import type { DriverType } from '~entities/driver';
import type { Constructor } from '~entities/constructor';

const DriversConstructorsMock: Constructor[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `constructor_ref_${index + 1}`,
    name: `constructor_name_${index + 1}`,
    nationality: `constructor_nationality_${index + 1}`,
    wiki_url: `constructor_wiki_url_${index + 1}`,
}));

export const DriversMock: DriverType[] = [
    {
        id: 1,
        ref: 'driver_1',
        constructor_id: DriversConstructorsMock[0].id,
        constructor_entity: DriversConstructorsMock.find(
            (constructor) => constructor.id === DriversConstructorsMock[0].id,
        )!,
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
        constructor_id: DriversConstructorsMock[0].id,
        constructor_entity: DriversConstructorsMock.find(
            (constructor) => constructor.id === DriversConstructorsMock[0].id,
        )!,
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
