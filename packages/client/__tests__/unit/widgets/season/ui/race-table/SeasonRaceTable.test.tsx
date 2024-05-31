import { render } from '@testing-library/react';

import { SeasonRaceTable } from '~widgets/season/ui';

import { SeasonsRacesMock } from '~mocks/entities/season/Season.mock';

import { getTableCellIndex } from '~tests-utils/shared/data-grid/getTableCellIndex';

describe('<RaceTable />', () => {
    it('should render correctly', () => {
        const { getByRole } = render(<SeasonRaceTable races={SeasonsRacesMock} />);

        expect(getByRole('columnheader', { name: 'Round' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Season' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Circuit' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Race date' })).toBeInTheDocument();
        expect(getByRole('columnheader', { name: 'Wiki' })).toBeInTheDocument();
    });

    it('should render season year as link', () => {
        const seasonYear = SeasonsRacesMock[0].year;

        const { getAllByRole } = render(<SeasonRaceTable races={SeasonsRacesMock} />);

        const seasonCellIndex = getTableCellIndex('Season');

        const seasonLink = getAllByRole('row')[1]
            .querySelectorAll('td')
            [seasonCellIndex].querySelector('a');

        expect(seasonLink).toBeInTheDocument();
        expect(seasonLink).toHaveTextContent(`${seasonYear}`);
        expect(seasonLink).toHaveAttribute('href', `/seasons/${seasonYear}`);
    });

    it('should render circuit name as link', () => {
        const circuitMock = SeasonsRacesMock[0].circuit;

        const { getAllByRole } = render(<SeasonRaceTable races={SeasonsRacesMock} />);

        const circuitCellIndex = getTableCellIndex('Circuit');

        const circuitLink = getAllByRole('row')[1]
            .querySelectorAll('td')
            [circuitCellIndex].querySelector('a');

        expect(circuitLink).toBeInTheDocument();
        expect(circuitLink).toHaveTextContent(circuitMock.name);
        expect(circuitLink).toHaveAttribute('href', `/circuits/${circuitMock.ref}`);
    });

    it('should render wiki url as link', () => {
        const wikiUrl = SeasonsRacesMock[0].wiki_url;

        const { getAllByRole } = render(<SeasonRaceTable races={SeasonsRacesMock} />);

        const wikiUrlCellIndex = getTableCellIndex('Wiki');

        const wikiLink = getAllByRole('row')[1]
            .querySelectorAll('td')
            [wikiUrlCellIndex].querySelector('a');

        expect(wikiLink).toBeInTheDocument();
        expect(wikiLink).toHaveTextContent('Wiki');
        expect(wikiLink).toHaveAttribute('href', wikiUrl);
    });
});
