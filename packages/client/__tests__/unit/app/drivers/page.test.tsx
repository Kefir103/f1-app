import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { DRIVER_URLS } from '~entities/driver/api';

import DriversPage from '~app/drivers/page';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('DriversPage', () => {
    it('should render drivers page correctly', async () => {
        const firstDriver = DriversMock[0];

        MockAdapter.onGet(DRIVER_URLS.index).replyOnce(200, {
            data: DriversMock,
            count: DriversMock.length,
        });

        const { getByRole } = await render(
            await RouterMock({
                children: await DriversPage({ searchParams: {} }),
            }),
        );

        expect(
            getByRole('link', {
                name: `${firstDriver.first_name} ${firstDriver.last_name} (${firstDriver.code})`,
            }),
        ).toBeInTheDocument();
    });

    it('should render breadcrumbs correctly', async () => {
        MockAdapter.onGet(DRIVER_URLS.index).replyOnce(200, {
            data: [],
            count: 0,
        });

        const { getByTitle } = await render(
            await RouterMock({
                children: await DriversPage({ searchParams: {} }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Drivers'))).toBeInTheDocument();
    });
});
