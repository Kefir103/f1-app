import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MenuItems } from '~views/home';

import { RouterMock } from '~tests-utils/router/Router.mock';

describe('<MenuItems />', () => {
    it('should render correctly', () => {
        const { getByRole } = render(
            <RouterMock>
                <MenuItems />
            </RouterMock>,
        );

        expect(getByRole('link', { name: 'Circuits' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Drivers' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Constructors' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Seasons' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Races' })).toBeInTheDocument();
    });
});
