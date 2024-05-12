import * as lodash from 'lodash';

interface IRelations {
    name: string;
    key: string;
    foreign_key: string;
    multiple: boolean;
    entities: object[];
}

const getRelations = (entity: object, relationsOptions: object, relations: IRelations[]) => {
    return Object.keys(relationsOptions).reduce((acc, relationName) => {
        const relation = relations.find(({ name }) => relationName === name);

        if (!relation) {
            return acc;
        }

        return {
            ...acc,
            [relation.name]: relation.entities[relation.multiple ? 'filter' : 'find'](
                (relationEntity) => entity[relation.key] === relationEntity[relation.foreign_key],
            ),
        };
    }, {});
};

export const UnitMockRepository = (entities: object[], relations: IRelations[] = []) => ({
    find: ({ take, skip, order, relations: relationsOptions }) => {
        let resultEntities = [...entities];

        if (lodash.isPlainObject(order)) {
            const { keys, orders } = Object.entries(order).reduce(
                (acc, [key, order]: [string, boolean | 'ASC' | 'DESC']) => {
                    acc.keys.push(key);
                    acc.orders.push(lodash.isString(order) ? order.toLowerCase() : order);

                    return acc;
                },
                { keys: [], orders: [] },
            );

            resultEntities = lodash.orderBy(resultEntities, keys, orders);
        }

        if (relations.length > 0 && relationsOptions) {
            resultEntities = resultEntities.map((entity) => ({
                ...entity,
                ...getRelations(entity, relationsOptions, relations),
            }));
        }

        return resultEntities.slice(skip, take);
    },
    findOneBy: (whereCondition: object) => {
        return entities.find((entity) => {
            return Object.entries(whereCondition).every(([key, value]) => entity[key] === value);
        });
    },
    findOne: ({ where, relations: relationOptions }) => {
        let entity = UnitMockRepository(entities, relations).findOneBy(where);

        if (relationOptions) {
            entity = {
                ...entity,
                ...getRelations(entity, relationOptions, relations),
            };
        }

        return entity;
    },
    count: entities.length,
});
