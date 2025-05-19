import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { useSearchParams } from 'next/navigation';

import { URLS } from '~shared/config/urls';

import CircuitsPage from '~next/app/circuits/page';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

jest.mock('next/navigation');

describe('Circuits page', () => {
    beforeEach(() => {
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn(),
        });
    });

    it('should render correctly', async () => {
        MockAdapter.onGet(URLS.circuit.index).replyOnce(200, {
            data: CircuitsMock,
            count: CircuitsMock.length,
        });

        const { getByText } = render(
            await RouterMock({
                children: await CircuitsPage({
                    searchParams: { page: '1', perPage: '10' },
                }),
            }),
        );

        expect(getByText(CircuitsMock[0].name)).toBeInTheDocument();
    });

    it('should render correctly without searchParams', async () => {
        MockAdapter.onGet(URLS.circuit.index).replyOnce(200, {
            data: CircuitsMock,
            count: CircuitsMock.length,
        });

        const { getByText } = render(
            await RouterMock({
                children: await CircuitsPage({
                    searchParams: {},
                }),
            }),
        );

        expect(getByText(CircuitsMock[0].name)).toBeInTheDocument();
    });

    it('should render breadcrumbs correctly', async () => {
        MockAdapter.onGet(URLS.circuit.index).replyOnce(200, {
            data: [],
            count: 0,
        });

        const { getByTitle } = await render(
            await RouterMock({
                children: await CircuitsPage({ searchParams: {} }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Circuits'))).toBeInTheDocument();
    });
});
