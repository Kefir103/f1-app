'use client';

import { Grid } from '@mui/material';
import { mdiRacingHelmet } from '@mdi/js';

import { MenuItem } from '~shared/ui/menu-item/MenuItem';
import type { IMenuItem } from '~shared/ui/menu-item/type';
import { useRouter } from 'next/navigation';

const menuItems: Omit<IMenuItem, 'onClick'>[] = [
    {
        icon: mdiRacingHelmet,
        title: 'Drivers',
        description: 'List of all drivers',
        link: '/drivers',
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
