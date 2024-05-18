import { render } from '@testing-library/react';

import { CircuitList } from '~widgets/circuit/ui';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

describe('<CircuitList />', () => {
    it('should render correctly', () => {
        const circuits = [CircuitsMock[0], CircuitsMock[1]];

        const { getByRole } = render(<CircuitList circuits={circuits} />);

        expect(getByRole('link', { name: circuits[0].name })).toBeInTheDocument();
        expect(getByRole('link', { name: circuits[1].name })).toBeInTheDocument();
    });
});
