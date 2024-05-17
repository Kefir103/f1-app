import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';

import { DriverListCard } from '~entities/driver/ui/list-card/DriverListCard';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

describe('<DriverListCard />', () => {
    it('should render correctly', () => {
        const driver = DriversMock[0];

        const { getByRole, getByText, getByTitle } = render(<DriverListCard driver={driver} />);

        // Driver link
        const driverLink = getByRole('link', {
            name: `${driver.first_name} ${driver.last_name} (${driver.code})`,
        });

        expect(driverLink).toBeInTheDocument();
        expect(driverLink).toHaveAttribute('href', `/drivers/${driver.ref}`);

        const constructorLink = getByTitle(`Team: ${driver.constructor_entity.name}`);

        expect(constructorLink).toBeInTheDocument();
        expect(constructorLink).toHaveAttribute(
            'href',
            `/constructors/${driver.constructor_entity.ref}`,
        );

        // Driver date of birth
        expect(
            getByText(
                `Date of birth: ${moment(driver.date_of_birth).format('DD.MM.YYYY')} (age 0)`,
            ),
        ).toBeInTheDocument();

        // Driver nationality
        expect(getByText(`Nationality: ${driver.nationality}`)).toBeInTheDocument();

        // Driver Wins count
        expect(getByText(`Wins: ${driver.wins_count}`)).toBeInTheDocument();

        // Driver Poles count
        expect(getByText(`Pole positions: ${driver.poles_count}`)).toBeInTheDocument();

        // Driver wiki
        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();
    });
    it('should render drivers name without code correctly', () => {
        const driver = {
            ...DriversMock[0],
            code: '',
        };

        const { getByRole } = render(<DriverListCard driver={driver} />);

        expect(
            getByRole('link', { name: `${driver.first_name} ${driver.last_name}` }),
        ).toBeInTheDocument();
    });
});
