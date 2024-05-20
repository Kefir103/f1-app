import { render } from '@testing-library/react';

import { ResultTable } from '~entities/result/ui/table/ResultTable';

import { ResultsMock } from '~mocks/entities/result/Result.mock';

describe('<ResultTable />', () => {
    it('should render correctly', () => {
        const { getByRole } = render(<ResultTable results={ResultsMock} />);

        expect(getByRole('columnheader', { name: 'Position' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap time' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap rank' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap number' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Points' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Laps' })).toBeInTheDocument();
    });
});
