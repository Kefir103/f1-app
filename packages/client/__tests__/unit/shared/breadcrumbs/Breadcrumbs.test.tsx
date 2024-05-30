import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import type { IBreadcrumbItem } from '~shared/ui/breadcrumbs/Breadcrumbs';
import { Breadcrumbs } from '~shared/ui/breadcrumbs';

describe('<Breadcrumbs />', () => {
    it('should render correctly', () => {
        const breadcrumbsItems: IBreadcrumbItem[] = [
            {
                path: '',
                label: 'Home',
            },
            {
                path: 'index',
                label: 'Index page',
            },
        ];

        const { getByRole } = render(<Breadcrumbs items={breadcrumbsItems} />);

        const firstItem = getByRole('link', { name: breadcrumbsItems[0].label });

        expect(firstItem).toBeInTheDocument();
        expect(firstItem).toHaveAttribute('href', '/');

        const secondItem = getByRole('link', { name: breadcrumbsItems[1].label });

        expect(secondItem).toBeInTheDocument();
        expect(secondItem).toHaveAttribute('href', `/${breadcrumbsItems[1].path}`);
    });
});
