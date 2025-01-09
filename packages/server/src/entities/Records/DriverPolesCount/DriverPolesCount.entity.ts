import { JoinColumn, OneToOne, PrimaryColumn, RelationId, ViewColumn, ViewEntity } from 'typeorm';

import { DriverPolesCountType } from '~f1-app/shared/types/Records/DriverPolesCount/DriverPolesCount';

import { Driver } from '~entities/Public/Driver/Driver.entity';

@ViewEntity({
    schema: 'records',
    name: 'driver_poles_count',
    expression: `
        WITH cte AS (SELECT driver.id                         AS driver_id,
                            CAST(count(qualyfying.id) AS INT) AS poles_count
                     FROM drivers driver
                              LEFT JOIN qualifying qualyfying ON qualyfying.driver_id = driver.id
                         AND qualyfying."driver_position" = 1
                     GROUP BY driver.id)
        SELECT *,
               CAST(dense_rank() OVER (ORDER BY poles_count DESC) as INT) as rank
        FROM cte;`,
})
export class DriverPolesCount implements DriverPolesCountType {
    @ViewColumn()
    @PrimaryColumn()
    @RelationId((driverPolesCount: DriverPolesCount) => driverPolesCount.driver)
    driver_id: number;

    @OneToOne(() => Driver, {
        nullable: false,
    })
    @JoinColumn({
        name: 'driver_id',
        referencedColumnName: 'id',
    })
    driver: Driver;

    @ViewColumn()
    poles_count: number;

    @ViewColumn()
    rank: number;
}
