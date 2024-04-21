import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MenuItem } from '~shared/ui/menu-item/MenuItem';

import { MenuItemMock } from '~mocks/shared/menu-item/MenuItem.mock';

describe('MenuItem', () => {
    it('should render MenuItem', () => {
        const { link, description, onClick, icon, title } = MenuItemMock;

        render(
            <MenuItem
                link={link}
                icon={icon}
                description={description}
                title={title}
                onClick={onClick}
            />,
        );

        expect(screen.getByText(MenuItemMock.title)).toBeInTheDocument();
        expect(screen.getByText(MenuItemMock.description as string)).toBeInTheDocument();
    });
});
