import { axios } from '~shared/api/axios';

import type { CircuitType } from '~entities/circuit';
import { CIRCUIT_URLS } from '~entities/circuit/api';

export async function useCircuitServer(ref: string) {
    try {
        const { data: circuit } = await axios.get<CircuitType>(CIRCUIT_URLS.ref(ref));

        return { circuit };
    } catch (error: unknown) {
        throw error;
    }
}
