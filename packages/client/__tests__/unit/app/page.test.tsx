import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from '~app/page';

import { RouterMock } from '~tests-utils/router/Router.mock';

describe('Home page', () => {
    it('should render home page', async () => {
        const { getByText } = render(await RouterMock({ children: await HomePage() }));

        expect(getByText('Circuits')).toBeInTheDocument();
        expect(getByText('Drivers')).toBeInTheDocument();
    });
});
