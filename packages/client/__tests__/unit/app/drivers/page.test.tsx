import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { URLS } from '~entities/driver/api/urls';

import DriversPage from '~app/drivers/page';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

import { RouterMock } from '~tests-utils/router/Router.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('DriversPage', () => {
    it('should render drivers page correctly', async () => {
        const firstDriver = DriversMock[0];

        MockAdapter.onGet(URLS.index).replyOnce(200, {
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
});
