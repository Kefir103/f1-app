import { render, screen } from '@testing-library/react';

import type { ResultType } from '~entities/result';
import { ResultTable } from '~entities/result/ui/table/ResultTable';

import { ResultsMock } from '~mocks/entities/result/Result.mock';

const getTableCellIndex = (headerText: string) =>
    screen
        .getAllByRole('columnheader')
        .findIndex((colHeader) => colHeader.textContent === headerText);

describe('<ResultTable />', () => {
    it('should render correctly', () => {
        const { getByRole } = render(<ResultTable results={ResultsMock as ResultType[]} />);

        expect(getByRole('columnheader', { name: 'Position' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap time' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap rank' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Fastest lap number' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Points' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Laps' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
    });

    it('should render DNF if position is null', () => {
        const resultsMock: typeof ResultsMock = [{ ...ResultsMock[0], position: null }];

        const { getAllByRole } = render(<ResultTable results={resultsMock as ResultType[]} />);

        const positionCellIndex = getTableCellIndex('Position');

        expect(getAllByRole('row')[1].querySelectorAll('td')[positionCellIndex]).toHaveTextContent(
            'DNF',
        );
    });

    it('should render DNS in position cell if laps count is equal 0', () => {
        const resultsMock: typeof ResultsMock = [{ ...ResultsMock[0], position: null, laps: 0 }];

        const { getAllByRole } = render(<ResultTable results={resultsMock as ResultType[]} />);

        const positionCellIndex = getTableCellIndex('Position');

        expect(getAllByRole('row')[1].querySelectorAll('td')[positionCellIndex]).toHaveTextContent(
            'DNS',
        );
    });

    it('should render "-" if fastest lap number is null', () => {
        const resultsMock: typeof ResultsMock = [{ ...ResultsMock[0], fastest_lap_number: null }];

        const { getAllByRole } = render(<ResultTable results={resultsMock as ResultType[]} />);

        const positionCellIndex = getTableCellIndex('Fastest lap number');

        expect(getAllByRole('row')[1].querySelectorAll('td')[positionCellIndex]).toHaveTextContent(
            '-',
        );
    });

    it('should render "-" if fastest lap time is null', () => {
        const resultsMock: typeof ResultsMock = [{ ...ResultsMock[0], fastest_lap_time: null }];

        const { getAllByRole } = render(<ResultTable results={resultsMock as ResultType[]} />);

        const positionCellIndex = getTableCellIndex('Fastest lap time');

        expect(getAllByRole('row')[1].querySelectorAll('td')[positionCellIndex]).toHaveTextContent(
            '-',
        );
    });
});
