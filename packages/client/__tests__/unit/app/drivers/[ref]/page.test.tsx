import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { DRIVER_URLS } from '~entities/driver/api';

import DriverPage from '~app/drivers/[ref]/page';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<DriverPage />', () => {
    it('should render correctly', async () => {
        const driver = DriversMock[0];

        MockAdapter.onGet(DRIVER_URLS.ref(driver.ref)).replyOnce(200, driver);

        const { getByRole } = await render(
            await RouterMock({
                children: await DriverPage({ params: { ref: driver.ref } }),
            }),
        );

        // Driver full name with code
        expect(
            getByRole('heading', {
                name: `${driver.first_name} ${driver.last_name} (${driver.code})`,
            }),
        ).toBeInTheDocument();
    });

    it('should render breadcrumbs correctly', async () => {
        const driverMock = DriversMock[0];

        MockAdapter.onGet(DRIVER_URLS.ref(driverMock.ref)).replyOnce(200, driverMock);

        const { getByTitle } = await render(
            await RouterMock({
                children: await DriverPage({ params: { ref: driverMock.ref } }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Drivers'))).toBeInTheDocument();
        expect(
            getByTitle(getBreadcrumbTitle(`${driverMock.first_name} ${driverMock.last_name}`)),
        ).toBeInTheDocument();
    });
});
