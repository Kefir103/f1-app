import { render } from '@testing-library/react';

import { RaceResultsTable } from '~widgets/race/ui';

import { ResultsMock } from '~mocks/entities/result/Result.mock';

describe('<RaceResultsTable />', () => {
    it('should renders correctly', () => {
        const { getByRole } = render(<RaceResultsTable results={ResultsMock} />);

        expect(getByRole('columnheader', { name: 'Position' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Driver number' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap time' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap rank' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap number' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Points' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Laps' })).toBeInTheDocument();
    });
});
