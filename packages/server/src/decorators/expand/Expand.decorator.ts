import { FindOptionsRelations, getMetadataArgsStorage } from 'typeorm';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

const filterRelations = (expandQuery: string, entityClass: EntityClassOrSchema): [][] => {
    const metadataArgsStorage = getMetadataArgsStorage();
    const expandRelations = expandQuery.split(',').map((relations) => relations.split('.'));
    const filteredRelationsArrays = [];

    for (const expandRelationsList of expandRelations) {
        let currentRelations = metadataArgsStorage.filterRelations(
            entityClass as () => EntityClassOrSchema,
        );
        const filteredRelationsNames = [];

        for (const relationName of expandRelationsList) {
            const relation = currentRelations.find(
                ({ propertyName }) => propertyName === relationName,
            );

            if (!relation || typeof relation.type !== 'function') {
                break;
            }

            currentRelations = metadataArgsStorage.filterRelations(
                (relation.type as () => EntityClassOrSchema).call(relation),
            );
            filteredRelationsNames.push(relationName);
        }

        filteredRelationsArrays.push(filteredRelationsNames);
    }

    return filteredRelationsArrays;
};

const setRelations = (relationNames: string[], relations: object = {}): object => {
    const resultRelations = { ...relations };

    for (let index = 0; index < relationNames.length; index++) {
        if (index !== relationNames.length - 1) {
            resultRelations[relationNames[index]] = {
                ...setRelations(
                    relationNames.slice(index + 1),
                    resultRelations[relationNames[index]],
                ),
            };
        }

        if (relationNames.length === 1 && !resultRelations[relationNames[index]]) {
            resultRelations[relationNames[index]] = true;
        }
    }

    return resultRelations;
};

const makeRelationsObject = (relationsArrays: [][]): object => {
    let relations = {};

    for (const relationNames of relationsArrays) {
        relations = {
            ...relations,
            ...setRelations(relationNames, relations),
        };
    }

    return relations;
};

export const expandFactory = (
    entityClass: EntityClassOrSchema,
    ctx: ExecutionContext,
): FindOptionsRelations<EntityClassOrSchema> => {
    const request = ctx.switchToHttp().getRequest();

    const expandQuery = request.query?.expand;

    if (!expandQuery?.length) {
        return {};
    }

    if (
        !getMetadataArgsStorage().filterRelations(entityClass as () => EntityClassOrSchema)?.length
    ) {
        return {};
    }

    const filteredRelationsArrays = filterRelations(expandQuery, entityClass);

    return makeRelationsObject(filteredRelationsArrays);
};

export const ExpandParams = createParamDecorator(expandFactory);
