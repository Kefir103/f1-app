import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NavigationHeader } from '~widgets/navigation/header/ui/NavigationHeader';

describe('<NavigationHeader />', () => {
    it('should render correctly', () => {
        render(<NavigationHeader />);

        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Drivers' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Constructors' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Seasons' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Races' })).toBeInTheDocument();
    });
});
