import { render } from '@testing-library/react';

import { SeasonInfo } from '~widgets/season/ui';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

describe('<SeasonInfo />', () => {
    it('should render correctly', () => {
        const seasonMock = SeasonsMock[0];

        const { getByRole } = render(<SeasonInfo season={seasonMock} />);

        expect(getByRole('heading', { name: `Season ${seasonMock.year}` })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();
    });
});
