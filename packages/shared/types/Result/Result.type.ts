export interface ResultType {
    id: number;
    race_id: number;
    driver_id: number;
    constructor_id: number;
    driver_number: number;
    position_start_grid: number;
    position: number;
    position_text: string;
    position_order: number;
    points: number;
    laps: number;
    time_finish: string;
    time_milliseconds: number;
    fastest_lap_number: number;
    fastest_lap_rank: number;
    fastest_lap_time: string;
    fastest_lap_speed: string;
    status_id: number;
}
