import { axios } from '~shared/api/axios';

import { URLS } from '~shared/config/urls';

import type { CircuitType } from '~entities/circuit';

export async function useCircuitServer(ref: string) {
    try {
        const { data: circuit } = await axios.get<CircuitType>(URLS.circuit.ref(ref));

        return { circuit };
    } catch (error: unknown) {
        throw error;
    }
}
