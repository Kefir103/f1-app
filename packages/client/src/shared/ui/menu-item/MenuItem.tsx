import NextLink from 'next/link';
import Icon from '@mdi/react';
import { Card, CardHeader, CardContent, CardTitle } from '~shadcn/ui/card';

import { Typography } from '~shared/ui/typography/Typography';
import type { IMenuItem } from '~shared/ui/menu-item/type';

export function MenuItem({ icon, link, title, description }: IMenuItem) {
    return (
        <Card className={'card'}>
            <CardHeader>
                <CardTitle>
                    <div className={'flex items-center'}>
                        <Icon path={icon} size={1.5} />
                        <Typography.Title level={2} className={'pb-0'}>
                            <NextLink href={link} className={'link ml-2'} title={title}>
                                {title}
                            </NextLink>
                        </Typography.Title>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>
        </Card>
    );
}
