import NextLink from 'next/link';
import classNames from 'classnames';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

export interface IBreadcrumbItem {
    path: string;
    label: string;
}

interface IBreadcrumbs {
    items: IBreadcrumbItem[];
}

export function Breadcrumbs({ items }: IBreadcrumbs) {
    const getBreadcrumbUrl = (index: number): string => {
        const breadcrumbsUntilCurrent = items.slice(0, index + 1);

        if (breadcrumbsUntilCurrent.length === 1) {
            return '/';
        }

        return breadcrumbsUntilCurrent.map(({ path }) => path).join('/');
    };

    return (
        <MuiBreadcrumbs
            className={'mb-4 mt-20 w-full'}
            separator={<span className={'dark:text-amber-50'}>{'/'}</span>}
        >
            {items.map((item, index) => {
                const breadcrumbUrl = getBreadcrumbUrl(index);

                return (
                    <NextLink
                        className={classNames(
                            'rounded-full px-4 py-2 dark:bg-slate-900 dark:text-amber-50',
                            {
                                'underline underline-offset-4': index < items.length - 1,
                            },
                        )}
                        key={`breadcrumb_item_${breadcrumbUrl}`}
                        href={breadcrumbUrl}
                        title={`Breadcrumb: ${item.label}`}
                    >
                        {item.label}
                    </NextLink>
                );
            })}
        </MuiBreadcrumbs>
    );
}
