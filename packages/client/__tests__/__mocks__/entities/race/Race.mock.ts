import type { Race } from '~entities/race';
import type { CircuitType } from '~entities/circuit';

const RacesCircuitMock: CircuitType[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    name: `circuit_name_${index + 1}`,
    ref: `circuit_ref_${index + 1}`,
    location: `circuit_location_${index + 1}`,
    longitude: 1,
    altitude: 1,
    wiki_url: `circuit_wiki_${index + 1}`,
    country: `circuit_country_${index + 1}`,
    latitude: 1,
}));

export const RacesMock: Race[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    circuit_id: 1,
    circuit: RacesCircuitMock.find((circuit) => circuit.id === index + 1)!,
    year: index + 1,
    round: 1,
    name: `name_${index + 1}`,
    date: new Date(),
    start_time: '',
    wiki_url: `wiki_${index + 1}`,
    fp1_date: new Date(),
    fp1_time: '',
    fp2_date: new Date(),
    fp2_time: '',
    fp3_date: new Date(),
    fp3_time: '',
    qualifying_date: new Date(),
    qualifying_time: '',
    sprint_date: new Date(),
    sprint_time: '',
}));
