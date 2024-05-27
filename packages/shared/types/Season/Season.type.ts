import type { RaceType } from '../Race/Race.type';

export interface SeasonType {
    id: number;
    year: number;
    wiki_url: string;

    races?: RaceType[];
}
