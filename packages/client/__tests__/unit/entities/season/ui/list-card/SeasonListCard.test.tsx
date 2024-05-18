import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SeasonListCard } from '~entities/season/ui';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

describe('<SeasonListCard />', () => {
    it('should render correctly', () => {
        const season = SeasonsMock[0];

        const { getByRole } = render(<SeasonListCard season={season} />);

        const seasonName = getByRole('link', { name: `Season ${season.year}` });

        expect(seasonName).toBeInTheDocument();
        expect(seasonName).toHaveAttribute('href', `/seasons/${season.year}`);

        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();
    });
});
