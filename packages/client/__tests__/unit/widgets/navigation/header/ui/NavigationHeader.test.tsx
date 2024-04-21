import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NavigationHeader } from '~widgets/navigation/header/ui/NavigationHeader';

describe('<NavigationHeader />', () => {
    it('should render correctly', () => {
        render(<NavigationHeader />);

        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    });
});
