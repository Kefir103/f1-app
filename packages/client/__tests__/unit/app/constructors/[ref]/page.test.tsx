import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axiosMockAdapter from 'axios-mock-adapter';

import { axios } from '~shared/api/axios';

import ConstructorPage from '~app/constructors/[ref]/page';
import { CONSTRUCTOR_URLS } from '~entities/constructor/api';

import { RouterMock } from '~tests-utils/router/Router.mock';
import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

// @ts-ignore
const MockAdapter = new axiosMockAdapter(axios);

describe('<ConstructorPage />', () => {
    it('should render correctly', async () => {
        const constructorMock = ConstructorsMock[0];

        MockAdapter.onGet(CONSTRUCTOR_URLS.ref(constructorMock.ref)).replyOnce(
            200,
            constructorMock,
        );

        const { getByRole, getByText } = await render(
            RouterMock({
                children: await ConstructorPage({
                    params: { ref: constructorMock.ref },
                }),
            }),
        );

        // Constructor name
        expect(getByRole('heading', { name: constructorMock.name })).toBeInTheDocument();

        // Constructor Wiki URL
        const wikiUrl = getByRole('link', { name: 'Wiki' });

        expect(wikiUrl).toBeInTheDocument();
        expect(wikiUrl).toHaveAttribute('href', constructorMock.wiki_url);

        // Constructor nationality
        expect(getByText(`Nationality: ${constructorMock.nationality}`)).toBeInTheDocument();
    });
});
