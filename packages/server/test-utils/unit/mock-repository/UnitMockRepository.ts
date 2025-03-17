import * as lodash from 'lodash';
import { FindOperator, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

interface IRelations {
    name: string;
    key: string;
    foreign_key: string;
    multiple: boolean;
    entities: object | object[];
    relationFn?: (entity: object, entities: object) => object | object[];
}

const getRelations = (entity: object, relationsOptions: object, relations: IRelations[]) => {
    return Object.keys(relationsOptions).reduce((acc, relationName) => {
        const relation = relations.find(({ name }) => relationName === name);

        if (!relation) {
            return acc;
        }

        if (typeof relation.relationFn !== 'undefined') {
            return {
                ...acc,
                [relation.name]: relation.relationFn(entity, relation.entities),
            };
        }

        return {
            ...acc,
            [relation.name]: relation.entities[relation.multiple ? 'filter' : 'find'](
                (relationEntity) => entity[relation.key] === relationEntity[relation.foreign_key],
            ),
        };
    }, {});
};

const filterEntities = (entities: object[], where: FindOptionsWhere<object>) => {
    return entities.filter((entity) => {
        return Object.entries(where).every(([key, value]) => {
            if (value instanceof FindOperator) {
                if (value.type === 'in') {
                    return value.value.includes(entity[key]);
                }
            }

            return entity[key] === value;
        });
    });
};

const selectEntitiesFields = (entities: object[], select: FindOptionsSelect<object>) => {
    const getSelectedFields = (entity, selectOptions) => {
        let resultEntity = {};

        for (const [entityKey, option] of Object.entries(selectOptions)) {
            if (option === true) {
                resultEntity[entityKey] = entity[entityKey];
            } else if (typeof option === 'object') {
                resultEntity = {
                    ...resultEntity,
                    [entityKey]: { ...getSelectedFields(entity[entityKey], option) },
                };
            }
        }

        return resultEntity;
    };

    return entities.map((entity) => getSelectedFields(entity, select));
};

export const UnitMockRepository = (entities: object[], relations: IRelations[] = []) => ({
    find: ({ take, skip, order, relations: relationsOptions, where, select }) => {
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

        if (where) {
            resultEntities = filterEntities(resultEntities, where);
        }

        if (select) {
            resultEntities = selectEntitiesFields(resultEntities, select);
        }

        return resultEntities.slice(skip, take);
    },
    findOneBy: (whereCondition: object) => {
        return filterEntities(entities, whereCondition)?.[0] || null;
    },
    findOne: ({ where, relations: relationOptions }) => {
        let entity = UnitMockRepository(entities, relations).findOneBy(where);

        if (!entity) {
            return null;
        }

        if (relationOptions) {
            entity = {
                ...entity,
                ...getRelations(entity, relationOptions, relations),
            };
        }

        return entity;
    },
    count: (options?: { where: object }) => {
        if (!options) {
            return entities.length;
        }

        if (options.where) {
            return entities.filter((entity) => {
                return Object.entries(options.where).every(([key, value]) => entity[key] === value);
            }).length;
        }
    },
});
