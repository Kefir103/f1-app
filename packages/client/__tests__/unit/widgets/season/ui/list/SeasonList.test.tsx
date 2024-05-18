import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SeasonList } from '~widgets/season/ui';

import { SeasonsMock } from '~mocks/entities/season/Season.mock';

describe('<SeasonList />', () => {
    it('should renders correctly', () => {
        const { getByRole } = render(<SeasonList seasons={SeasonsMock} />);

        expect(getByRole('link', { name: `Season ${SeasonsMock[0].year}` })).toBeInTheDocument();
        expect(getByRole('link', { name: `Season ${SeasonsMock[1].year}` })).toBeInTheDocument();
    });
});
