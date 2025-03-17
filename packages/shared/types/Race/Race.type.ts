import type { CircuitType } from '../Circuit/Circuit.type';
import type { ResultType } from '../Result/Result.type';
import type { RaceWinnerType } from './Winner/RaceWinner.type';

export interface RaceType {
    id: number;
    circuit_id: number;
    circuit: CircuitType;
    year: number;
    round: number;
    name: string;
    date: Date;
    start_time?: string | null;
    wiki_url: string;
    results?: ResultType[];
    winner?: RaceWinnerType | null;
    fp1_date?: Date | null;
    fp1_time?: string | null;
    fp2_date?: Date | null;
    fp2_time?: string | null;
    fp3_date?: Date | null;
    fp3_time?: string | null;
    qualifying_date?: Date | null;
    qualifying_time?: string | null;
    sprint_date?: Date | null;
    sprint_time?: string | null;
}
