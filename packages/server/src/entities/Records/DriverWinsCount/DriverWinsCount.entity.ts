import { JoinColumn, OneToOne, PrimaryColumn, RelationId, ViewColumn, ViewEntity } from 'typeorm';

import { DriverWinsCountType } from '~f1-app/shared/types/Records/DriverWinsCount/DriverWinsCount';

import { Driver } from '~entities/Public/Driver/Driver.entity';

@ViewEntity({
    schema: 'records',
    name: 'driver_wins_count',
    expression: `
        WITH cte AS (SELECT driver.id                 AS driver_id,
                            CAST(count(result.id) AS INT) AS wins_count
                     FROM drivers driver
                              LEFT JOIN results result ON result.driver_id = driver.id
                         AND result."position" = 1
                     GROUP BY driver.id)
        SELECT *,
               CAST(dense_rank() OVER (ORDER BY wins_count DESC) AS INT) as rank
        FROM cte;`,
})
export class DriverWinsCount implements DriverWinsCountType {
    @ViewColumn()
    @PrimaryColumn()
    @RelationId((driverWinsCount: DriverWinsCount) => driverWinsCount.driver)
    driver_id: number;

    @OneToOne(() => Driver, {
        nullable: false,
    })
    @JoinColumn({ name: 'driver_id', referencedColumnName: 'id' })
    driver: Driver;

    @ViewColumn()
    wins_count: number;

    @ViewColumn()
    rank: number;
}
