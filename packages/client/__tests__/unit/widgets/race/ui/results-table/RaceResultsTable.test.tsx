import { render } from '@testing-library/react';

import { RaceResultsTable } from '~widgets/race/ui';

import { RacesResultsMock } from '~mocks/entities/race/Race.mock';

describe('<RaceResultsTable />', () => {
    it('should renders correctly', () => {
        const { getByRole } = render(<RaceResultsTable results={RacesResultsMock} />);

        expect(getByRole('columnheader', { name: 'Position' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Driver' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap time' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap rank' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap number' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Points' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Laps' })).toBeInTheDocument();
    });

    it("should render driver's link", () => {
        const { driver } = RacesResultsMock[0];

        const { getByRole } = render(<RaceResultsTable results={RacesResultsMock} />);

        const driverLink = getByRole('link', { name: `${driver.first_name} ${driver.last_name}` });

        expect(driverLink).toBeInTheDocument();
        expect(driverLink).toHaveAttribute('href', `/drivers/${driver.ref}`);
    });
});
