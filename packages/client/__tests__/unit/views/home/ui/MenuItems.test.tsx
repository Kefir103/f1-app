import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MenuItems } from '~views/home';

import { RouterMock } from '~tests-utils/router/Router.mock';

describe('<MenuItems />', () => {
    it('should render correctly', () => {
        render(
            <RouterMock>
                <MenuItems />
            </RouterMock>,
        );

        expect(screen.getByText('Circuits')).toBeInTheDocument();
        expect(screen.getByText('Drivers')).toBeInTheDocument();
        expect(screen.getByText('Constructors')).toBeInTheDocument();
        expect(screen.getByText('Seasons')).toBeInTheDocument();
    });
});
