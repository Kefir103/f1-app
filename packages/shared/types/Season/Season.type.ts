import { SeasonWinnerDriverType } from './winner/SeasonWinnerDriver';

export interface SeasonType {
    id: number;
    year: number;
    wiki_url: string;
    winner_driver?: SeasonWinnerDriverType;
}
