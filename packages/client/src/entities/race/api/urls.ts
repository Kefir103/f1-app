export const URLS = {
    index: '/api/race',
    id: (id: number) => `/api/race/${id}`,
    results: (raceId: number) => `/api/race/${raceId}/results`,
};
