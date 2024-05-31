export const URLS = {
    index: '/api/season',
    year: (year: number) => `/api/season/${year}`,
    races: (year: number) => `/api/season/${year}/races`,
};
