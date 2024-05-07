import * as lodash from 'lodash';

export const UnitMockRepository = (entities: object[]) => ({
    find: ({ take, skip, order }) => {
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

        return resultEntities.slice(skip, take);
    },
    findOneBy: (whereCondition: object) => {
        return entities.find((entity) => {
            return Object.entries(whereCondition).every(([key, value]) => entity[key] === value);
        });
    },
    count: entities.length,
});
