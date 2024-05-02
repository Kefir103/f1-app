import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ConstructorListCard } from '~entities/constructor/ui';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

describe('<ConstructorListCard>', () => {
    it('should renders correctly', () => {
        const constructorMock = ConstructorsMock[0];

        const { getByText, getByRole } = render(
            <ConstructorListCard constructorEntity={constructorMock} />,
        );

        const constructorLink = getByRole('link', { name: constructorMock.name });

        expect(constructorLink).toBeInTheDocument();
        expect(constructorLink).toHaveAttribute('href', `/constructors/${constructorMock.ref}`);

        expect(getByText(`Nationality: ${constructorMock.nationality}`)).toBeInTheDocument();
        expect(getByRole('link', { name: 'Wiki' })).toBeInTheDocument();
    });
});
