import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import CircuitsPage from '~app/circuits/page';
import { CIRCUIT_URLS } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('Circuits page', () => {
    it('should render correctly', async () => {
        MockAdapter.onGet(CIRCUIT_URLS.index).replyOnce(200, {
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
        MockAdapter.onGet(CIRCUIT_URLS.index).replyOnce(200, {
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
        MockAdapter.onGet(CIRCUIT_URLS.index).replyOnce(200, {
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
