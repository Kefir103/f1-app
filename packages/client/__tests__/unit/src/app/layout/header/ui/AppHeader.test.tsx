import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AppHeader } from '~app/layout/header';

describe('<NavigationHeader />', () => {
    it('should render correctly', () => {
        render(<AppHeader />);

        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Drivers' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Constructors' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Seasons' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Races' })).toBeInTheDocument();
    });
});
