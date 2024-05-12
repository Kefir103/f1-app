import { faker } from '@faker-js/faker';

import type { RaceType } from '~f1-app/shared/types/Race/Race.type';
import type { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';

export const RacesCircuitsMock: CircuitType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    name: `circuit_${index + 1}`,
    latitude: 1,
    country: `country_${index + 1}`,
    wiki_url: `wiki_${index + 1}`,
    altitude: 1,
    ref: `circuit_${index + 1}`,
    longitude: 1,
    location: `location_${index + 1}`,
}));

export const RacesMock: Omit<RaceType, 'circuit'>[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    circuit_id: 1,
    year: index + 1,
    round: index + 1,
    name: `name_${index + 1}`,
    date: new Date(),
    start_time: '',
    wiki_url: `wiki_${index + 1}`,
    fp1_date: faker.helpers.maybe(() => new Date(), { probability: 0.5 }) || null,
    fp1_time: '',
    fp2_date: faker.helpers.maybe(() => new Date(), { probability: 0.5 }) || null,
    fp2_time: '',
    fp3_date: faker.helpers.maybe(() => new Date(), { probability: 0.5 }) || null,
    fp3_time: '',
    qualifying_date: faker.helpers.maybe(() => new Date(), { probability: 0.5 }) || null,
    qualifying_time: '',
    sprint_date: faker.helpers.maybe(() => new Date(), { probability: 0.5 }) || null,
    sprint_time: '',
}));
