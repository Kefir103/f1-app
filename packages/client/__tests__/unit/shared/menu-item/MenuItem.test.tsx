import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MenuItem } from '~shared/ui/menu-item/MenuItem';

import { MenuItemMock } from '~mocks/shared/menu-item/MenuItem.mock';

describe('MenuItem', () => {
    it('should render MenuItem', () => {
        const { link, description, icon, title } = MenuItemMock;

        const { getByRole, getByText } = render(
            <MenuItem link={link} icon={icon} description={description} title={title} />,
        );

        expect(getByRole('link', { name: MenuItemMock.title })).toBeInTheDocument();
        expect(getByText(MenuItemMock.description as string)).toBeInTheDocument();
    });
});
