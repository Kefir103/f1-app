import type { DriverType } from '~entities/driver';
import { DriverListCard } from '~entities/driver/ui';

interface IDriverList {
    drivers: Array<DriverType>;
}

export function DriverList({ drivers }: IDriverList) {
    return (
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4'}>
            {drivers?.map((driver) => (
                <DriverListCard key={`driver_${driver.ref}`} driver={driver} />
            ))}
        </div>
    );
}
