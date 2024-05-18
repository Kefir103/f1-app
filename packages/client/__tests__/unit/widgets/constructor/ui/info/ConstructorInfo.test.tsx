import { render } from '@testing-library/react';

import { ConstructorInfo } from '~widgets/constructor/ui';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

describe('<ConstructorInfo />', () => {
    it('should render correctly', () => {
        const constructorMock = ConstructorsMock[0];

        const { getByRole, getByText } = render(
            <ConstructorInfo constructor_entity={constructorMock} />,
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
