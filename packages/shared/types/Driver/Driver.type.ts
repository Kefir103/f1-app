import type { ConstructorType } from '../Constructor/Constructor.type';
import type { DriverWinsCountType } from '../Records/DriverWinsCount/DriverWinsCount';
import type { DriverPolesCountType } from '../Records/DriverPolesCount/DriverPolesCount';

export interface DriverType {
    id: number;
    ref: string;
    constructor_id: number;
    constructor_entity: ConstructorType;
    number: number;
    code: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    nationality: string;
    wiki_url: string;

    wins_count: Omit<DriverWinsCountType, 'driver'>;
    poles_count: Omit<DriverPolesCountType, 'driver'>;
}
