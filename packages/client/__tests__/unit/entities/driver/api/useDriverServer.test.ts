import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { URLS } from '~shared/config/urls';

import { useDriverServer } from '~entities/driver/api';
import type { DriverType } from '~entities/driver';

import { DriversConstructorsMock, DriversMock } from '~mocks/entities/driver/Driver.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

function formatDriver(driver: Partial<DriverType>) {
    return {
        ...driver,
        date_of_birth: driver.date_of_birth!.toString(),
    };
}

describe('useDriverServer', () => {
    it('should fetch driver by ref correct', async () => {
        const driverMock = formatDriver(DriversMock[0]);

        MockAdapter.onGet(URLS.driver.ref(driverMock.ref!)).replyOnce(200, driverMock);

        const { driver } = await useDriverServer(driverMock.ref!);

        expect(driver).toEqual(driverMock);
    });

    it('should fetch driver by ref with expand fields correctly', async () => {
        const expandFields = ['constructor_entity'];

        const driverMock = formatDriver({
            ...DriversMock[0],
            constructor_entity: DriversConstructorsMock.find(
                ({ id }) => id === DriversMock[0].constructor_id,
            ),
        });

        MockAdapter.onGet(URLS.driver.ref(driverMock.ref!), {
            params: {
                expand: expandFields.join(','),
            },
        }).replyOnce(200, driverMock);

        const { driver } = await useDriverServer(driverMock.ref!, {
            expandFields: expandFields,
        });

        expect(driver).toEqual(driverMock);
    });

    it('should throw an error on error response', async () => {
        MockAdapter.onGet(URLS.driver.ref('')).networkErrorOnce();

        await expect(async () => await useDriverServer('')).rejects.toThrow(Error);
    });
});
