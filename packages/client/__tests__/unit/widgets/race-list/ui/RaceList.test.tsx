import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RaceList } from '~widgets/race-list/ui';

import { RacesMock } from '~mocks/entities/race/Race.mock';

describe('<RaceList />', () => {
    it('should render correctly', () => {
        const { getByRole } = render(<RaceList races={RacesMock} />);

        expect(getByRole('link', { name: RacesMock[0].name })).toBeInTheDocument();
        expect(getByRole('link', { name: RacesMock[1].name })).toBeInTheDocument();
    });
});
