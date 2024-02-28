export interface SprintResultType {
    id: number;
    raceId: number;
    driverId: number;
    constructorId: number;
    number: number;
    grid: number;
    position: number;
    positionText: string;
    positionOrder: string;
    points: number;
    laps: number;
    time: string;
    milliseconds: number;
    fastestLap: number;
    fastestLapTime: string;
    statusId: number;
}
