import 'reflect-metadata';

import { CSVParser } from '../CSVParser';
import { Driver as DriverMock } from './mocks/Driver.schema';

describe('CSVParser', () => {
    it('should parse csv correct', async () => {
        const parsedData = await new CSVParser().parse(DriverMock);

        const expectedData = [
            {
                id: 830,
                code: 'VER',
                firstName: 'Max',
                lastName: 'Verstappen',
            },
        ];

        expect(parsedData).toEqual(expectedData);
    });
});
