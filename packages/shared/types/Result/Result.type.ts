import { RaceType } from '../Race/Race.type';

export interface ResultType {
    id: number;
    race_id: number;
    race: RaceType;
    driver_id: number;
    constructor_id: number;
    driver_number?: number | null;
    position_start_grid: number;
    position?: number | null;
    position_text: string;
    position_order: number;
    points: number;
    laps: number;
    time_finish?: string | null;
    time_milliseconds?: number | null;
    fastest_lap_number?: number | null;
    fastest_lap_rank?: number;
    fastest_lap_time?: string | null;
    fastest_lap_speed?: string | null;
    status_id: number;
}
