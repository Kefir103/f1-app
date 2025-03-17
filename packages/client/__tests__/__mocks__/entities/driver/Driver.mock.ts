import type { DriverType } from '~entities/driver';
import type { Constructor } from '~entities/constructor';

export const DriversConstructorsMock: Constructor[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `constructor_ref_${index + 1}`,
    name: `constructor_name_${index + 1}`,
    nationality: `constructor_nationality_${index + 1}`,
    wiki_url: `constructor_wiki_url_${index + 1}`,
}));

export const DriversMock: DriverType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `driver_${index + 1}`,
    constructor_id: DriversConstructorsMock[index].id,
    constructor_entity: DriversConstructorsMock[index],
    number: index + 1,
    code: 'COD',
    first_name: `first_name_${index + 1}`,
    last_name: `last_name_${index + 1}`,
    date_of_birth: new Date(2024, 0, 1),
    nationality: 'nationality',
    wiki_url: `wiki_${index + 1}`,

    wins_count: {
        driver_id: index + 1,
        wins_count: 0,
        rank: 1,
    },
    poles_count: {
        driver_id: index + 1,
        poles_count: 0,
        rank: 1,
    },
}));
