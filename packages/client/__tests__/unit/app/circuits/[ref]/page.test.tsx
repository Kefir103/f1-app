import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axios } from '~shared/api/axios';
import axiosMockAdapter from 'axios-mock-adapter';

import CircuitPage from '~app/circuits/[ref]/page';

import { CIRCUIT_URLS } from '~entities/circuit/api';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';
import { RouterMock } from '~tests-utils/router/Router.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('Circuits Page', () => {
    it('should render correctly', async () => {
        const circuitMock = CircuitsMock[0];

        MockAdapter.onGet(CIRCUIT_URLS.ref(circuitMock.ref)).replyOnce(
            200,
            circuitMock,
        );

        const { getByRole } = render(
            await CircuitPage({
                params: {
                    ref: circuitMock.ref,
                },
            }),
        );

        expect(getByRole('heading', { name: CircuitsMock[0].name })).toBeInTheDocument();
    });

    it('should render breadcrumbs correctly', async () => {
        const circuitMock = CircuitsMock[0];

        MockAdapter.onGet(CIRCUIT_URLS.ref(circuitMock.ref)).replyOnce(
            200,
            circuitMock,
        );

        const { getByTitle } = await render(
            await RouterMock({
                children: await CircuitPage({ params: { ref: circuitMock.ref } }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Circuits'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle(circuitMock.name))).toBeInTheDocument();
    });
});
