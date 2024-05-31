import type { SeasonType } from '~entities/season';
import type { Race } from '~entities/race';
import type { CircuitType } from '~entities/circuit';

export const SeasonsMock: SeasonType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    year: index + 1,
    wiki_url: `season_wiki_${index + 1}`,
}));

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

export const SeasonsRacesMock: Race[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    circuit_id: index + 1,
    circuit: SeasonsCircuitsMock.find((circuit) => circuit.id === index + 1) as CircuitType,
    year: 1,
    season: SeasonsMock.find((season) => season.year === 1) as SeasonType,
    round: index + 1,
    name: `seasons_race_name_${index + 1}`,
    date: new Date(),
    start_time: '',
    wiki_url: `seasons_race_wiki_${index + 1}`,
    results: [],
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
