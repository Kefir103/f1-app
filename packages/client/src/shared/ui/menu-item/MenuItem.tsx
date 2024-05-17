import NextLink from 'next/link';
import { Card, CardContent, CardHeader } from '@mui/material';
import Icon from '@mdi/react';

import type { IMenuItem } from '~shared/ui/menu-item/type';

export function MenuItem({ icon, link, title, description }: IMenuItem) {
    return (
        <Card className={'card'}>
            <CardHeader
                title={
                    <div className={'flex items-center'}>
                        <Icon path={icon} size={1.5} />
                        <NextLink href={link} className={'link ml-2'} title={title}>
                            {title}
                        </NextLink>
                    </div>
                }
            />
            <CardContent>{description}</CardContent>
        </Card>
    );
}
