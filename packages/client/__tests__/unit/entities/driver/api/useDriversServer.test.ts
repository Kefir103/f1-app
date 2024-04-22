import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { URLS } from '~entities/driver/api/urls';
import { useDriversServer } from '~entities/driver/api';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';
import { DriverType } from '~entities/driver/type';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

function formatDrivers(drivers: DriverType[]) {
    return drivers.map((driver) => ({
        ...driver,
        date_of_birth: driver.date_of_birth.toString(),
    }));
}

describe('useDriversServer', () => {
    it('should fetch drivers correctly with pagination', async () => {
        const page = 1;
        const perPage = 1;
        const driversMock = formatDrivers([DriversMock[0]]);

        MockAdapter.onGet(URLS.index).replyOnce(200, {
            data: driversMock,
            count: driversMock.length,
        });

        const { data, count } = await useDriversServer({ page, perPage });

        expect(data).toEqual(driversMock);
        expect(count).toEqual(driversMock.length);
    });
    it('should throw an error next from response', async () => {
        MockAdapter.onGet(URLS.index).networkErrorOnce();

        await expect(async () => {
            return await useDriversServer({ page: 1, perPage: 1 });
        }).rejects.toThrow(Error);
    });
});
