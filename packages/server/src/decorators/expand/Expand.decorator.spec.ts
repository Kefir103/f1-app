import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExecutionContext } from '@nestjs/common';

import { expandFactory } from './Expand.decorator';

interface MockRelationMetadataArgs {
    target: () => any;
    propertyName: string;
    type: () => any;
}

const mockContext: {
    switchToHttp: () => HttpArgumentsHost;
} = {
    switchToHttp: jest.fn().mockReturnValue({
        getNext: jest.fn(),
        getResponse: jest.fn(),
        getRequest: () => ({}),
    }),
};

jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');

    return {
        __esModule: true,
        ...actual,
        getMetadataArgsStorage: jest.fn(),
    };
});

function mockRelations(relations: MockRelationMetadataArgs[]) {
    const mockedTypeorm = jest.requireMock('typeorm');

    jest.spyOn(mockedTypeorm, 'getMetadataArgsStorage').mockImplementation(() => ({
        relations: relations,
        filterRelations: function (entityClass: () => any) {
            return this.relations.filter((relation) => relation.target.name === entityClass.name);
        },
    }));
}

function mockExpandQuery(expandQueryString: string) {
    jest.spyOn(mockContext.switchToHttp(), 'getRequest').mockReturnValueOnce({
        query: {
            expand: expandQueryString,
        },
    });
}

describe('ExpandDecorator', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return empty object if expand query is empty', () => {
        const Entity = () => ({});

        const relations = [];

        mockExpandQuery('');
        mockRelations(relations);

        const relationObject = expandFactory(Entity, mockContext as ExecutionContext);

        expect(relationObject).toEqual({});
    });

    it("should return empty object if entity hasn't relations", () => {
        const relationName = 'relation';

        const Entity = () => ({});
        const AnotherEntity = () => ({});

        const relations: MockRelationMetadataArgs[] = [
            {
                target: AnotherEntity,
                propertyName: relationName,
                type: () => ({}),
            },
        ];

        mockExpandQuery(relationName);
        mockRelations(relations);

        const relationObject = expandFactory(Entity, mockContext as ExecutionContext);

        expect(relationObject).toEqual({});
    });

    it('should return single typeorm relation object from query', () => {
        const relationName = 'relation';

        const Entity = () => ({});

        const relations: MockRelationMetadataArgs[] = [
            {
                target: Entity,
                propertyName: relationName,
                type: () => ({}),
            },
        ];

        mockExpandQuery(relationName);
        mockRelations(relations);

        const relationObject = expandFactory(Entity, mockContext as ExecutionContext);

        expect(relationObject).toEqual({
            [relationName]: true,
        });
    });

    it('should return typeorm relation with inner relations from query', () => {
        const relationName = 'relation';
        const innerRelation = 'innerRelation';

        const Entity = () => ({});
        const Relation = () => ({});

        const relations: MockRelationMetadataArgs[] = [
            {
                target: Entity,
                propertyName: relationName,
                type: () => Relation,
            },
            {
                target: Relation,
                propertyName: innerRelation,
                type: () => ({}),
            },
        ];

        mockExpandQuery(`${relationName}.${innerRelation}`);
        mockRelations(relations);

        const relationObject = expandFactory(Entity, mockContext as ExecutionContext);

        expect(relationObject).toEqual({
            [relationName]: {
                [innerRelation]: true,
            },
        });
    });

    it('should return typeorm relation without non-existing relation from query', () => {
        const relationName = 'relation';
        const nonExistingRelation = 'nonExistingRelation';

        const Entity = () => ({});

        const relations: MockRelationMetadataArgs[] = [
            {
                target: Entity,
                propertyName: relationName,
                type: () => ({}),
            },
        ];

        mockExpandQuery(`${relationName}.${nonExistingRelation}`);
        mockRelations(relations);

        const relationObject = expandFactory(Entity, mockContext as ExecutionContext);

        expect(relationObject).toEqual({
            [relationName]: true,
        });
    });

    it('should return typeorm relation with inner relation and without non-existing relation from same relation from query', () => {
        const relationName = 'relation';
        const innerRelation = 'innerRelation';
        const nonExistingRelation = 'nonExistingRelation';

        const Entity = () => ({});
        const Relation = () => ({});

        const relations: MockRelationMetadataArgs[] = [
            {
                target: Entity,
                propertyName: relationName,
                type: () => Relation,
            },
            {
                target: Relation,
                propertyName: innerRelation,
                type: () => ({}),
            },
        ];

        mockExpandQuery(`${relationName}.${innerRelation},${relationName}.${nonExistingRelation}`);
        mockRelations(relations);

        const relationObject = expandFactory(Entity, mockContext as ExecutionContext);

        expect(relationObject).toEqual({
            [relationName]: {
                [innerRelation]: true,
            },
        });
    });
});
