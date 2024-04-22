export const UnitMockRepository = (entities: object[]) => ({
    find: ({ take, skip }) => entities.slice(skip, take),
    findOneBy: (whereCondition: object) => {
        return entities.find((entity) => {
            return Object.entries(whereCondition).every(([key, value]) => entity[key] === value);
        });
    },
    count: entities.length,
});
