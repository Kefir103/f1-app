import { Fragment } from 'react';
import NextLink from 'next/link';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '~shadcn/ui/breadcrumb';


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
        <Breadcrumb className={'mb-4 mt-20 w-full'}>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const breadcrumbUrl = getBreadcrumbUrl(index);

                    return (
                        <Fragment key={`breadcrumb_item_${breadcrumbUrl}`}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <NextLink
                                        href={breadcrumbUrl}
                                        title={`Breadcrumb: ${item.label}`}
                                    >
                                        {item.label}
                                    </NextLink>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < items.length - 1 && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
