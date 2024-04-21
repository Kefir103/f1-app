import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { URLS } from '~entities/driver/api/urls';

import DriverPage from '~app/drivers/[ref]/page';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<DriverPage />', () => {
    it('should render correctly', async () => {
        const driver = DriversMock[0];

        MockAdapter.onGet(URLS.ref(driver.ref)).replyOnce(200, driver);

        const { getByRole, getByText } = await render(
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

        // Driver wiki link
        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();

        // Driver date of birth
        expect(
            getByText(`Date of birth: ${moment(driver.date_of_birth).format('DD.MM.YYYY')}`),
        ).toBeInTheDocument();

        // Driver nationality
        expect(getByText(`Nationality: ${driver.nationality}`)).toBeInTheDocument();

        // Driver wins count
        expect(getByText(`Wins: ${driver.wins_count}`)).toBeInTheDocument();

        // Driver poles count
        expect(getByText(`Poles: ${driver.poles_count}`)).toBeInTheDocument();
    });
    it('should render driver without code correctly', async () => {
        const driver = {
            ...DriversMock[0],
            code: '',
        };

        MockAdapter.onGet(URLS.ref(driver.ref)).replyOnce(200, driver);

        const { getByRole } = await render(
            await RouterMock({
                children: await DriverPage({ params: { ref: driver.ref } }),
            }),
        );

        expect(
            getByRole('heading', { name: `${driver.first_name} ${driver.last_name}` }),
        ).toBeInTheDocument();
    });
});
