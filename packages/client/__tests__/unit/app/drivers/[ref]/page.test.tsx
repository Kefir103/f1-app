import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
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

        const { getByRole, getByText, getByTitle } = await render(
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

        // Driver's constructor

        const driverConstructor = getByTitle(`Team: ${driver.constructor_entity.name}`);

        expect(driverConstructor).toBeInTheDocument();
        expect(driverConstructor).toHaveAttribute(
            'href',
            `/constructors/${driver.constructor_entity.ref}`,
        );

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

        MockAdapter.onGet(DRIVER_URLS.ref(driver.ref)).replyOnce(200, driver);

        const { getByRole } = await render(
            await RouterMock({
                children: await DriverPage({ params: { ref: driver.ref } }),
            }),
        );

        expect(
            getByRole('heading', { name: `${driver.first_name} ${driver.last_name}` }),
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
