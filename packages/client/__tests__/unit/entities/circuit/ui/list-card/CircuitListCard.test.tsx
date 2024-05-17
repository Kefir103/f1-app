import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CircuitListCard } from '~entities/circuit/ui';

import { CircuitsMock } from '~mocks/entities/circuit/Circuit.mock';

describe('<CircuitListCard />', () => {
    it('should render correctly', () => {
        const circuit = CircuitsMock[0];

        const { getByRole, getByText } = render(<CircuitListCard circuit={circuit} />);

        // Circuit link
        const circuitLink = getByRole('link', { name: circuit.name });

        expect(circuitLink).toBeInTheDocument();
        expect(circuitLink).toHaveAttribute('href', `/circuits/${circuit.ref}`);

        // Country
        expect(getByText(`Country: ${circuit.country}`)).toBeInTheDocument();

        // Location
        expect(getByText(`Location: ${circuit.location}`)).toBeInTheDocument();

        // Latitude
        expect(getByText(`Latitude: ${circuit.latitude}`)).toBeInTheDocument();

        // Longitude
        expect(getByText(`Longitude: ${circuit.longitude}`)).toBeInTheDocument();

        // Altitude
        expect(getByText(`Altitude: ${circuit.altitude}m`)).toBeInTheDocument();

        // Wiki url
        const wikiUrl = getByRole('link', { name: 'Wiki' });

        expect(wikiUrl).toBeInTheDocument();
        expect(wikiUrl).toHaveAttribute('href', circuit.wiki_url);
    });
});
