import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment/moment';

import { RaceInfo } from '~widgets/race/ui';

import { RacesMock } from '~mocks/entities/race/Race.mock';

describe('<RaceInfo />', () => {
    it('should renders correctly', () => {
        const raceMock = RacesMock[0];

        const { getByRole, getByText, getByTitle } = render(<RaceInfo race={raceMock} />);

        expect(getByRole('heading', { name: raceMock.name })).toBeInTheDocument();

        const circuit = getByTitle(`Circuit: ${raceMock.circuit.name}`);

        expect(circuit).toBeInTheDocument();
        expect(circuit).toHaveAttribute('href', `/circuits/${raceMock.circuit.ref}`);

        const season = getByTitle(`Season: ${raceMock.year}`);

        expect(season).toBeInTheDocument();
        expect(season).toHaveAttribute('href', `/seasons/${raceMock.year}`);

        expect(getByText(`Round: ${raceMock.round}`)).toBeInTheDocument();

        expect(
            getByText(`Race date: ${moment(raceMock.date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();

        expect(
            getByText(`FP1 Date: ${moment(raceMock.fp1_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();
        expect(
            getByText(`FP2 Date: ${moment(raceMock.fp2_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();
        expect(
            getByText(`FP3 Date: ${moment(raceMock.fp3_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        expect(
            getByText(`Qualifying date: ${moment(raceMock.qualifying_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        expect(
            getByText(`Sprint date: ${moment(raceMock.sprint_date).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();
    });

    it('should render "Unknown" if dates are null', async () => {
        const raceMock = {
            ...RacesMock[0],
            fp1_date: null,
            fp2_date: null,
            fp3_date: null,
            qualifying_date: null,
            sprint_date: null,
        };

        const { getByText } = render(<RaceInfo race={raceMock} />);

        expect(getByText('FP1 Date: Unknown')).toBeInTheDocument();
        expect(getByText('FP2 Date: Unknown')).toBeInTheDocument();
        expect(getByText('FP3 Date: Unknown')).toBeInTheDocument();

        expect(getByText('Qualifying date: Unknown')).toBeInTheDocument();

        expect(getByText('Sprint date: Unknown')).toBeInTheDocument();
    });
});
