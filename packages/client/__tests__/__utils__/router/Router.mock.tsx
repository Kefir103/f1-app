import { PropsWithChildren } from 'react';
import {
    AppRouterContext,
    AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function RouterMock({
    children,
    ...routerProps
}: PropsWithChildren<Partial<AppRouterInstance>>) {
    const routerValue: AppRouterInstance = {
        push() {},
        replace() {},
        refresh() {},
        prefetch() {},
        forward() {},
        back() {},
        ...routerProps,
    };

    return <AppRouterContext.Provider value={routerValue}>{children}</AppRouterContext.Provider>;
}
