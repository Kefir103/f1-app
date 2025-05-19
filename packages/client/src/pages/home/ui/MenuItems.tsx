import {
    mdiRacingHelmet,
    mdiStadiumOutline,
    mdiTools,
    mdiCalendarMultiple,
    mdiFlagCheckered,
} from '@mdi/js';

import { MenuItem } from '~shared/ui/menu-item/MenuItem';
import type { IMenuItem } from '~shared/ui/menu-item/type';

const menuItems: IMenuItem[] = [
    {
        icon: mdiRacingHelmet,
        title: 'Drivers',
        description: 'List of all drivers',
        link: '/drivers',
    },
    {
        icon: mdiStadiumOutline,
        title: 'Circuits',
        description: 'List of all circuits',
        link: '/circuits',
    },
    {
        icon: mdiTools,
        title: 'Constructors',
        description: 'List of all constructors',
        link: '/constructors',
    },
    {
        icon: mdiCalendarMultiple,
        title: 'Seasons',
        description: 'List of all seasons',
        link: '/seasons',
    },
    {
        icon: mdiFlagCheckered,
        title: 'Races',
        description: 'List of all races',
        link: '/races',
    },
];

export function MenuItems() {
    return (
        <div className={'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'}>
            {menuItems.map(({ icon, link, title, description }) => (
                <div key={`menu-item_${link}`}>
                    <MenuItem
                        key={`menu-item${link}`}
                        icon={icon}
                        title={title}
                        description={description}
                        link={link}
                    />
                </div>
            ))}
        </div>
    );
}
