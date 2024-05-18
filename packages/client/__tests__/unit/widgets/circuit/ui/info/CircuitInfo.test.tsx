import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CircuitInfo } from '~widgets/circuit/ui';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

describe('<CircuitInfo />', () => {
    it('should render correctly', async () => {
        const circuitMock = CircuitsMock[0];

        const { getByText, getByRole } = render(<CircuitInfo circuit={circuitMock} />);

        expect(getByRole('heading', { name: CircuitsMock[0].name })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Wiki' })).toHaveAttribute('href', circuitMock.wiki_url);
        expect(getByText(`Country: ${circuitMock.country}`)).toBeInTheDocument();
        expect(getByText(`Location: ${circuitMock.location}`)).toBeInTheDocument();
        expect(getByText(`Latitude: ${circuitMock.latitude}`)).toBeInTheDocument();
        expect(getByText(`Longitude: ${circuitMock.longitude}`)).toBeInTheDocument();
        expect(getByText(`Altitude: ${circuitMock.altitude}m`)).toBeInTheDocument();
    });
});
