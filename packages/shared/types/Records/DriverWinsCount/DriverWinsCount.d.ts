import { DriverType } from '../../Driver/Driver.type';

export interface DriverWinsCountType {
    driver_id: number;
    driver: DriverType;
    wins_count: number;
    rank: number;
}