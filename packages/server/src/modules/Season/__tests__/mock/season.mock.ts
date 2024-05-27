import type { SeasonType } from '~f1-app/shared/types/Season/Season.type';
import type { RaceType } from '~f1-app/shared/types/Race/Race.type';
import type { CircuitType } from '~f1-app/shared/types/Circuit/Circuit.type';
import type { ResultType } from '~f1-app/shared/types/Result/Result.type';
import type { DriverType } from '~f1-app/shared/types/Driver/Driver.type';
import type { ConstructorType } from '~f1-app/shared/types/Constructor/Constructor.type';
import type { QualifyingType } from '~f1-app/shared/types/Qualifying/Qualifying.type';
import type { StatusType } from '~f1-app/shared/types/Status/Status.type';

export const SeasonsCircuitsMock: CircuitType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    ref: `seasons_circuit_ref_${index + 1}`,
    name: `seasons_circuit_name_${index + 1}`,
    location: `seasons_circuit_location_${index + 1}`,
    country: `seasons_circuit_country_${index + 1}`,
    latitude: 1,
    longitude: 1,
    altitude: 1,
    wiki_url: `seasons_circuit_wiki_${index + 1}`,
}));

export const SeasonsRacesMock: Omit<RaceType, 'season'>[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        circuit_id: 1,
        circuit: SeasonsCircuitsMock.find((circuit) => circuit.id === 1),
        year: index + 1,
        round: index + 1,
        name: `seasons_race_name_${index + 1}`,
        date: new Date(),
        start_time: null,
        wiki_url: `seasons_race_wiki_${index + 1}`,
        fp1_date: null,
        fp1_time: null,
        fp2_date: null,
        fp2_time: null,
        fp3_date: null,
        fp3_time: null,
        qualifying_date: null,
        qualifying_time: null,
        sprint_date: null,
        sprint_time: null,
    }));

export const SeasonsResultsMock: Omit<
    ResultType,
    'race' | 'driver' | 'constructor_entity' | 'status'
>[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: 1,
    driver_id: 1,
    constructor_id: 1,
    position_start_grid: index + 1,
    position_text: '',
    position_order: 99,
    position: 99,
    points: 0,
    laps: 1,
    status_id: 1,
}));

export const SeasonsDriversMock: Omit<DriverType, 'constructor_entity'>[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        ref: `seasons_driver_ref_${index + 1}`,
        constructor_id: 1,
        number: index + 1,
        code: '',
        first_name: `seasons_driver_first_name_${index + 1}`,
        last_name: `seasons_driver_last_name_${index + 1}`,
        date_of_birth: new Date(),
        nationality: `seasons_driver_nationality_${index + 1}`,
        wiki_url: `seasons_driver_wiki_${index + 1}`,

        wins_count: 0,
        poles_count: 0,
    }));

export const SeasonsConstructorsMock: ConstructorType[] = new Array(2)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        ref: `seasons_constructor_ref_${index + 1}`,
        name: `seasons_constructor_name_${index + 1}`,
        nationality: `seasons_constructor_nationality_${index + 1}`,
        wiki_url: `seasons_constructor_wiki_${index + 1}`,
    }));

export const SeasonsQualifyingsMock: QualifyingType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    race_id: index + 1,
    driver_id: index + 1,
    constructor_id: index + 1,
    driver_number: index + 1,
    driver_position: 99,
    q1_time: '',
    q2_time: '',
    q3_time: '',
}));

export const SeasonsStatusesMock: StatusType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    status: `seasons_status_${index + 1}`,
}));

export const SeasonsMock: SeasonType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    year: index + 1,
    wiki_url: `seasons_wiki_${index + 1}`,
}));
