import { DriverType } from '../../Driver/Driver.type';
import { RaceType } from '../Race.type';

export interface RaceWinnerType extends Omit<DriverType, 'wins_count' | 'poles_count'> {
    driver: DriverType;
    race_id: number;
    race: RaceType;
}
