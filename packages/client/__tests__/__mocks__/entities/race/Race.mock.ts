import type { Race } from '~entities/race';

export const RacesMock: Race[] = new Array(2).fill(null).map((_, index) => ({
    id: index + 1,
    circuit_id: 1,
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
