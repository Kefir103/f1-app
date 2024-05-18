import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from '~app/page';

import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

describe('Home page', () => {
    it('should render home page', async () => {
        const { getByRole } = render(await RouterMock({ children: await HomePage() }));

        expect(getByRole('link', { name: 'Circuits' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Drivers' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Constructors' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Seasons' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Races' })).toBeInTheDocument();
    });

    it('should render correct breadcrumbs', async () => {
        const { getByTitle } = render(await RouterMock({ children: await HomePage() }));

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
    });
});
