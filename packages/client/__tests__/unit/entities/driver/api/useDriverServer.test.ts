import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { DRIVER_URLS, useDriverServer } from '~entities/driver/api';

import { DriversMock } from '~mocks/entities/driver/Driver.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('useDriverServer', () => {
    it('should fetch driver by ref correct', async () => {
        const driverMock = {
            ...DriversMock[0],
            date_of_birth: DriversMock[0].date_of_birth.toString(),
        };

        MockAdapter.onGet(DRIVER_URLS.ref(driverMock.ref)).replyOnce(200, driverMock);

        const { driver } = await useDriverServer(driverMock.ref);

        expect(driver).toEqual(driverMock);
    });
    it('should throw an error on error response', async () => {
        MockAdapter.onGet(DRIVER_URLS.ref('')).networkErrorOnce();

        await expect(async () => await useDriverServer('')).rejects.toThrow(Error);
    });
});
