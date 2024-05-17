import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from '~app/page';

import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

describe('Home page', () => {
    it('should render home page', async () => {
        const { getByText } = render(await RouterMock({ children: await HomePage() }));

        expect(getByText('Circuits')).toBeInTheDocument();
        expect(getByText('Drivers')).toBeInTheDocument();
        expect(getByText('Constructors')).toBeInTheDocument();
        expect(getByText('Seasons')).toBeInTheDocument();
        expect(getByText('Races')).toBeInTheDocument();
    });

    it('should render correct breadcrumbs', async () => {
        const { getByTitle } = render(await RouterMock({ children: await HomePage() }));

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
    });
});
