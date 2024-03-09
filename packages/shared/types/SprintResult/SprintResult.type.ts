export interface SprintResultType {
    id: number;
    race_id: number;
    driver_id: number;
    constructor_id: number;
    driver_number: number;
    position_start_grid: number;
    position: number;
    position_text: string;
    position_order: string;
    points: number;
    laps: number;
    finish_time: string;
    finish_milliseconds: number;
    fastest_lap_number: number;
    fastest_lap_time: string;
    status_id: number;
}
