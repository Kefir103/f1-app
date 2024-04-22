import type { DriverType as DriverTypeContract } from '~f1-app/shared/types/Driver/Driver.type';

export interface DriverType extends DriverTypeContract {
    wins_count: number;
    poles_count: number;
}
