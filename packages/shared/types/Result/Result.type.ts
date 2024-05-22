import type { RaceType } from '../Race/Race.type';
import type { DriverType } from '../Driver/Driver.type';
import type { ConstructorType } from '../Constructor/Constructor.type';

export interface ResultType {
    id: number;
    race_id: number;
    race: RaceType;
    driver_id: number;
    driver: DriverType;
    constructor_id: number;
    constructor_entity: ConstructorType;
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
