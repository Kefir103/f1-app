import { Card, CardContent, CardHeader } from '@mui/material';
import Icon from '@mdi/react';

import type { IMenuItem } from '~shared/ui/menu-item/type';

export function MenuItem({ icon, title, description, onClick }: IMenuItem) {
    return (
        <Card className={'card'} onClick={onClick}>
            <CardHeader
                title={
                    <div className={'flex items-center'}>
                        <Icon path={icon} size={1.5} />
                        <h1 className={'ml-1 inline'}>{title}</h1>
                    </div>
                }
            />
            <CardContent>{description}</CardContent>
        </Card>
    );
}
