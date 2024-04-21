'use client';

import { Grid } from '@mui/material';
import { mdiRacingHelmet, mdiStadiumOutline } from '@mdi/js';
import { useRouter } from 'next/navigation';

import { MenuItem } from '~shared/ui/menu-item/MenuItem';
import type { IMenuItem } from '~shared/ui/menu-item/type';

const menuItems: Omit<IMenuItem, 'onClick'>[] = [
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
];

export function MenuItems() {
    const router = useRouter();

    const onMenuItemClick = (link: string) => {
        router.push(link);
    };

    return (
        <Grid container spacing={2}>
            {menuItems.map(({ icon, link, title, description }) => (
                <Grid xs={12} md={6} lg={3} item={true} key={`menu-item_${link}`}>
                    <MenuItem
                        key={`menu-item${link}`}
                        icon={icon}
                        title={title}
                        description={description}
                        link={link}
                        onClick={() => onMenuItemClick(link)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
