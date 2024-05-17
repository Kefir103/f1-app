import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ConstructorList } from '~widgets/constructor-list/ui';

import { ConstructorsMock } from '~mocks/entities/constructor/Constructor.mock';

describe('<ConstructorList>', () => {
    it('should renders correctly', () => {
        const { getByText } = render(<ConstructorList constructors={ConstructorsMock} />);

        expect(getByText(ConstructorsMock[0].name)).toBeInTheDocument();
        expect(getByText(ConstructorsMock[1].name)).toBeInTheDocument();
    });
});
