import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';

import { RaceListCard } from '~entities/race/ui';

import { RacesMock } from '~mocks/entities/race/Race.mock';

describe('<RaceListCard />', () => {
    it('should render correctly', () => {
        const raceMock = RacesMock[0];

        const { getByRole, getByText, getByTitle } = render(<RaceListCard race={raceMock} />);

        const raceName = getByRole('link', { name: raceMock.name });

        expect(raceName).toBeInTheDocument();
        expect(raceName).toHaveAttribute('href', `/races/${raceMock.id}`);

        const circuit = getByTitle(`Circuit: ${raceMock.circuit.name}`);

        expect(circuit).toBeInTheDocument();
        expect(circuit).toHaveAttribute('href', `/circuits/${raceMock.circuit.ref}`);

        const season = getByTitle(`Year: ${raceMock.year}`);

        expect(season).toBeInTheDocument();
        expect(season).toHaveAttribute('href', `/seasons/${raceMock.year}`);

        expect(getByText(`Round: ${raceMock.round}`)).toBeInTheDocument();

        expect(
            getByText(`Date: ${moment(raceMock.date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();
    });
});
