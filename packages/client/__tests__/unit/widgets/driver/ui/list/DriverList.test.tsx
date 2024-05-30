import { render } from '@testing-library/react';

import { DriverList } from '~widgets/driver/ui';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

describe('<DriverList />', () => {
    it('should render correctly', () => {
        const drivers = [DriversMock[0], DriversMock[1]];
        const [firstDriver, secondDriver] = drivers;

        const { getByRole } = render(<DriverList drivers={drivers} />);

        expect(
            getByRole('link', {
                name: `${firstDriver.first_name} ${firstDriver.last_name} (${firstDriver.code})`,
            }),
        ).toBeInTheDocument();
        expect(
            getByRole('link', {
                name: `${secondDriver.first_name} ${secondDriver.last_name} (${secondDriver.code})`,
            }),
        ).toBeInTheDocument();
    });
});
