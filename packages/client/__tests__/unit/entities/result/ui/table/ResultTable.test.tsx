import { render } from '@testing-library/react';

import type { ResultType } from '~entities/result';
import { ResultTable } from '~entities/result/ui';

import { ResultsMock } from '~mocks/entities/result/Result.mock';

import { getTableCellIndex } from '~tests-utils/shared/data-grid/getTableCellIndex';

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

    it('only one fastest laps columns row should have purple text if fastest lap order is first', () => {
        const resultsMock: typeof ResultsMock = ResultsMock.map((resultMock, index) => ({
            ...resultMock,
            fastest_lap_time: `1:${index + 1}`,
            fastest_lap_rank: index + 1,
            fastest_lap_number: 1,
        }));

        const { getAllByRole } = render(<ResultTable results={resultsMock as ResultType[]} />);

        const fastestLapTimeCellIndex = getTableCellIndex('Fastest lap time');
        const fastestLapRankCellIndex = getTableCellIndex('Fastest lap rank');
        const fastestLapNumberCellIndex = getTableCellIndex('Fastest lap number');

        const [_, firstTableBodyRow, secondTableBodyRow] = getAllByRole('row');

        const fastestLapsExpectingClassNames = ['dark:text-purple-500', 'text-purple-600'];

        expect(firstTableBodyRow.querySelectorAll('td')[fastestLapTimeCellIndex]).toHaveClass(
            ...fastestLapsExpectingClassNames,
        );
        expect(firstTableBodyRow.querySelectorAll('td')[fastestLapRankCellIndex]).toHaveClass(
            ...fastestLapsExpectingClassNames,
        );
        expect(firstTableBodyRow.querySelectorAll('td')[fastestLapNumberCellIndex]).toHaveClass(
            ...fastestLapsExpectingClassNames,
        );

        expect(secondTableBodyRow.querySelectorAll('td')[fastestLapTimeCellIndex]).not.toHaveClass(
            ...fastestLapsExpectingClassNames,
        );
        expect(secondTableBodyRow.querySelectorAll('td')[fastestLapRankCellIndex]).not.toHaveClass(
            ...fastestLapsExpectingClassNames,
        );
        expect(
            secondTableBodyRow.querySelectorAll('td')[fastestLapNumberCellIndex],
        ).not.toHaveClass(...fastestLapsExpectingClassNames);
    });
});
