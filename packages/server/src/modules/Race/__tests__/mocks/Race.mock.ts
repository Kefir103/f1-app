import { faker } from '@faker-js/faker';

import type { RaceType } from '~f1-app/shared/types/Race/Race.type';

export const RacesMock: RaceType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    circuit_id: 1,
    year: 1,
    round: 1,
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
