import type { ConstructorType } from '../Constructor/Constructor.type';

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

    wins_count: number;
    poles_count: number;
}
