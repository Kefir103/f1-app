import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axiosMockAdapter from 'axios-mock-adapter';

import { axios } from '~shared/api/axios';

import ConstructorsPage from '~app/constructors/page';

import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { RouterMock } from '~tests-utils/router/Router.mock';
import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';
import { getBreadcrumbTitle } from '~tests-utils/shared/breadcrumbs/getBreadcrumbTitle';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<ConstructorsPage>', () => {
    it('should renders correctly', async () => {
        MockAdapter.onGet(CONSTRUCTOR_URLS.index).replyOnce(200, {
            data: ConstructorsMock,
            count: ConstructorsMock.length,
        });

        const { getByText } = await render(
            RouterMock({
                children: await ConstructorsPage({
                    searchParams: {},
                }),
            }),
        );

        expect(getByText(ConstructorsMock[0].name)).toBeInTheDocument();
        expect(getByText(ConstructorsMock[0].name)).toHaveAttribute(
            'href',
            `/constructors/${ConstructorsMock[0].ref}`,
        );
    });

    it('should render breadcrumbs correctly', async () => {
        MockAdapter.onGet(CONSTRUCTOR_URLS.index).replyOnce(200, {
            data: [],
            count: 0,
        });

        const { getByTitle } = await render(
            await RouterMock({
                children: await ConstructorsPage({
                    searchParams: {},
                }),
            }),
        );

        expect(getByTitle(getBreadcrumbTitle('Home'))).toBeInTheDocument();
        expect(getByTitle(getBreadcrumbTitle('Constructors'))).toBeInTheDocument();
    });
});
