import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export type SeedObject = {
    entitySchema: EntityClassOrSchema;
    data: object[] | object;
};

export const TestDbConnection = (dump: SeedObject[]) => {
    const entities = dump.map(({ entitySchema }) => entitySchema);

    return [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    type: 'better-sqlite3',
                    database: ':memory:',
                    synchronize: true,
                    entities: entities,
                    dropSchema: true,
                };
            },
            dataSourceFactory: async (options) => {
                const dataSource = await new DataSource(options).initialize();
                await seedDatabase(dataSource, dump);

                return dataSource;
            },
        }),
        TypeOrmModule.forFeature(entities),
    ];
};

export async function seedDatabase(dataSource: DataSource, seedObjects: Array<SeedObject>) {
    for (const seedObject of seedObjects) {
        const repository = dataSource.getRepository(seedObject.entitySchema);

        await repository.insert(seedObject.data);
    }
}
