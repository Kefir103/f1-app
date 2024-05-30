import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';

import { DriverInfo } from '~widgets/driver/ui';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

describe('<DriverInfo />', () => {
    it('should render correctly', () => {
        const driverMock = DriversMock[0];

        const { getByRole, getByText, getByTitle } = render(<DriverInfo driver={driverMock} />);

        // Driver full name with code
        expect(
            getByRole('heading', {
                name: `${driverMock.first_name} ${driverMock.last_name} (${driverMock.code})`,
            }),
        ).toBeInTheDocument();

        // Driver's constructor
        const driverConstructor = getByTitle(`Team: ${driverMock.constructor_entity.name}`);

        expect(driverConstructor).toBeInTheDocument();
        expect(driverConstructor).toHaveAttribute(
            'href',
            `/constructors/${driverMock.constructor_entity.ref}`,
        );

        // Driver wiki link
        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();

        // Driver date of birth
        expect(
            getByText(`Date of birth: ${moment(driverMock.date_of_birth).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        // Driver nationality
        expect(getByText(`Nationality: ${driverMock.nationality}`)).toBeInTheDocument();

        // Driver wins count
        expect(getByText(`Wins: ${driverMock.wins_count}`)).toBeInTheDocument();

        // Driver poles count
        expect(getByText(`Poles: ${driverMock.poles_count}`)).toBeInTheDocument();
    });
    it('should render driver without code correctly', () => {
        const driverMock = {
            ...DriversMock[0],
            code: '',
        };

        const { getByRole } = render(<DriverInfo driver={driverMock} />);

        expect(
            getByRole('heading', { name: `${driverMock.first_name} ${driverMock.last_name}` }),
        ).toBeInTheDocument();
    });
});
