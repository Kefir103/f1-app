import { faker } from '@faker-js/faker';

import type { RaceType } from '~f1-app/shared/types/Race/Race.type';
import type { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';
import type { ResultType } from '~f1-app/shared/types/Result/Result.type';
import type { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import type { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';
import type { QualifyingType } from '~f1-app/shared/types/Qualifying/Qualifying.type';
import type { StatusType } from '~f1-app/shared/types/Status/Status.type';

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

export const RacesMock: Omit<RaceType, 'circuit' | 'results'>[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
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

export const RacesConstructorsMock: ConstructorType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    name: `constructor_name_${index + 1}`,
    ref: `constructor_ref_${index + 1}`,
    nationality: `constructor_nationality_${index + 1}`,
    wiki_url: `constructor_wiki_${index + 1}`,
}));

export const RacesDriversMock: Omit<DriverType, 'constructor_entity'>[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        constructor_id: index + 1,
        ref: `driver_ref_${index + 1}`,
        wiki_url: `driver_wiki_${index + 1}`,
        first_name: `driver_first_name_${index + 1}`,
        last_name: `driver_last_name_${index + 1}`,
        code: `driver_code_${index + 1}`,
        number: 0,
        date_of_birth: new Date(),
        nationality: `driver_nationality_${index + 1}`,
        poles_count: 0,
        wins_count: 0,
    }));

export const RacesQualifyingsMock: QualifyingType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: index + 1,
    driver_id: index + 1,
    constructor_id: index + 1,
    driver_number: 0,
    driver_position: 99,
    q1_time: '',
    q2_time: '',
    q3_time: '',
}));

export const RacesStatusesMock: StatusType[] = new Array(2).fill(null).map((_ ,index) => ({
    id: index + 1,
    status: `races_status_${index + 1}`,
}))

export const RacesResultsMock: Omit<ResultType, 'race'>[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        race_id: 1,
        driver_id: index + 1,
        driver: RacesDriversMock.find((driver) => driver.id === index + 1) as DriverType,
        constructor_id: index + 1,
        constructor_entity: RacesConstructorsMock.find((constructor) => constructor.id === index + 1),
        driver_number: index + 1,
        position_start_grid: index + 1,
        position: 99,
        position_text: `${index + 1}`,
        position_order: index + 1,
        points: 1,
        laps: 1,
        time_finish: '',
        time_milliseconds: 1,
        fastest_lap_number: index + 1,
        fastest_lap_rank: index + 1,
        fastest_lap_time: '',
        fastest_lap_speed: '',
        status_id: 1,
        status: RacesStatusesMock.find((status) => status.id === 1),
    }));
