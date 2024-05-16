import { CircuitType } from '../Circuit/Circuit.type';
import { ResultType } from '../Result/Result.type';

export interface RaceType {
    id: number;
    circuit_id: number;
    circuit: CircuitType;
    year: number;
    round: number;
    name: string;
    date: Date;
    start_time: string;
    wiki_url: string;
    results?: ResultType[];
    fp1_date: Date;
    fp1_time: string;
    fp2_date: Date;
    fp2_time: string;
    fp3_date: Date;
    fp3_time: string;
    qualifying_date: Date;
    qualifying_time: string;
    sprint_date: Date;
    sprint_time: string;
}
