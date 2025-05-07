export const URLS = {
    circuit: {
        index: '/api/circuit',
        ref: (ref: string) => `/api/circuit/${ref}`,
    },
    constructor: {
        index: '/api/constructor',
        ref: (ref: string) => `/api/constructor/${ref}`,
    },
    driver: {
        index: '/api/driver',
        ref: (ref: string) => `/api/driver/${ref}`,
    },
    race: {
        index: '/api/race',
        id: (id: number) => `/api/race/${id}`,
        results: (raceId: number) => `/api/race/${raceId}/results`,
    },
    season: {
        index: '/api/season',
        year: (year: number) => `/api/season/${year}`,
    },
};
