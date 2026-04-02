import { DriverType } from '../../Driver/Driver.type';
import { SeasonType } from '../Season.type';
import { ConstructorType } from '../../Constructor/Constructor.type';

export interface SeasonWinnerDriverType {
    driver_id: number;
    driver: DriverType;

    year: number;
    season: SeasonType;

    constructor_id: number;
    constructor_entity: ConstructorType;
}
