import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import type { DriverType } from '~entities/driver';
import { DRIVER_URLS, useDriversServer } from '~entities/driver/api';

import { DriversMock, DriversConstructorsMock } from '~mocks/entities/driver/Driver.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

function formatDrivers(drivers: Partial<DriverType>[]) {
    return drivers.map((driver) => ({
        ...driver,
        date_of_birth: driver.date_of_birth!.toString(),
    }));
}

describe('useDriversServer', () => {
    it('should fetch drivers correctly with pagination', async () => {
        const page = 1;
        const perPage = 1;
        const driversMock = formatDrivers([DriversMock[0]]);

        MockAdapter.onGet(DRIVER_URLS.index).replyOnce(200, {
            data: driversMock,
            count: driversMock.length,
        });

        const { data, count } = await useDriversServer({ page, perPage });

        expect(data).toEqual(driversMock);
        expect(count).toEqual(driversMock.length);
    });

    it('should fetch drivers correctly with pagination and expand fields', async () => {
        const page = 1;
        const perPage = 1;
        const expandFields = ['constructor_entity'];

        const driversMock = formatDrivers([
            {
                ...DriversMock[0],
                constructor_entity: DriversConstructorsMock.find(
                    ({ id }) => id === DriversMock[0].constructor_id,
                ),
            },
        ]);

        MockAdapter.onGet(DRIVER_URLS.index, {
            params: {
                page,
                perPage,
                expand: expandFields.join(','),
            },
        }).replyOnce(200, {
            data: driversMock,
            count: driversMock.length,
        });

        const { data, count } = await useDriversServer({ page, perPage, expandFields });

        expect(data).toEqual(driversMock);
        expect(count).toEqual(driversMock.length);
    });

    it('should throw an error next from response', async () => {
        MockAdapter.onGet(DRIVER_URLS.index).networkErrorOnce();

        await expect(async () => {
            return await useDriversServer({ page: 1, perPage: 1 });
        }).rejects.toThrow(Error);
    });
});
