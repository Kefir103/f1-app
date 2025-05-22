import {
    FindOperator,
    Equal,
    ILike,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Not,
    IsNull,
    Between,
    In,
    Or,
    And,
} from 'typeorm';

import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExecutionContext } from '@nestjs/common';

import { filterFactory } from '~decorators/filter/Filter.decorator';
import { describe } from 'node:test';

interface MockColumnMetadataArgs {
    target: () => any;
    propertyName: string;
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

function mockFilterQuery(filterObject?: object) {
    jest.spyOn(mockContext.switchToHttp(), 'getRequest').mockReturnValueOnce({
        query: {
            filter: filterObject,
        },
    });
}

function mockColumns(columns: MockColumnMetadataArgs[]) {
    const mockedTypeorm = jest.requireMock('typeorm');

    jest.spyOn(mockedTypeorm, 'getMetadataArgsStorage').mockImplementation(() => ({
        columns: columns,
        filterColumns: function (entityClass: () => any) {
            return this.columns.filter((column) => column.target.name === entityClass.name);
        },
    }));
}

function expectOperator(
    filterOperator: string,
    typeOrmOperator: (...value: any | any[]) => FindOperator<any>,
    value?: any,
) {
    const propertyName = 'id';

    const filters = {
        [propertyName]: {
            [filterOperator]: value,
        },
    };

    const Entity = () => ({});

    mockFilterQuery(filters);
    mockColumns([
        {
            target: Entity,
            propertyName: propertyName,
        },
    ]);

    const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

    expect(filterObject).toEqual({
        [propertyName]: typeOrmOperator(value),
    });
}

describe('FilterDecorator', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a non-modified filter object', () => {
        const propertyName = 'id';
        const filters = {
            [propertyName]: 1,
        };

        const Entity = () => ({});

        mockFilterQuery(filters);
        mockColumns([
            {
                target: Entity,
                propertyName: propertyName,
            },
        ]);

        const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

        expect(filterObject).toEqual(filters);
    });

    it('should return an empty filter object if column is not exists', () => {
        const filters = {
            'non-exist': 1,
        };

        const Entity = () => ({});

        mockFilterQuery(filters);
        mockColumns([
            {
                target: Entity,
                propertyName: 'exist_property',
            },
        ]);

        const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

        expect(filterObject).toEqual({});
    });

    it("should return an empty filter object if entity hasn't columns", () => {
        const filters = {
            property: 1,
        };

        const Entity = () => ({});

        mockFilterQuery(filters);
        mockColumns([]);

        const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

        expect(filterObject).toEqual({});
    });

    it('should return an empty filter object if filters are empty', () => {
        const Entity = () => ({});

        mockFilterQuery();
        mockColumns([
            {
                target: Entity,
                propertyName: 'id',
            },
        ]);

        const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

        expect(filterObject).toEqual({});
    });

    it('should return only existed entity columns from filters', () => {
        const existedColumnName = 'exist';
        const filters = {
            [existedColumnName]: 1,
            'non-exist': 1,
        };

        const Entity = () => ({});

        mockFilterQuery(filters);
        mockColumns([
            {
                target: Entity,
                propertyName: existedColumnName,
            },
        ]);

        const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

        expect(filterObject).toEqual({
            [existedColumnName]: 1,
        });
    });

    describe('FilterDecorator operators', () => {
        type MockFilterType = {
            [key in string]: {
                operator: (...value: any | any[]) => FindOperator<any>;
                value?: any;
            };
        };

        const filters: MockFilterType = {
            '=': {
                operator: Equal,
            },
            '!=': {
                operator: Not,
            },
            '<': {
                operator: LessThan,
            },
            '<=': {
                operator: LessThanOrEqual,
            },
            '>': {
                operator: MoreThan,
            },
            '>=': {
                operator: MoreThanOrEqual,
            },
            like: {
                operator: Like,
            },
            ilike: {
                operator: ILike,
            },
            not: {
                operator: Not,
            },
            null: {
                operator: IsNull,
            },
            between: {
                operator: Between,
            },
            in: {
                operator: In,
                value: [],
            },
            or: {
                operator: Or,
            },
            and: {
                operator: And,
            },
        };

        for (const [filterOperator, filterObject] of Object.entries(filters)) {
            it(`should return an object with ${filterObject.operator.name} operator if filter is '${filterOperator}'`, () => {
                expectOperator(filterOperator, filterObject.operator, filterObject?.value);
            });
        }
    });

    it('should return an objects with same Between operator result by different filter values', () => {
        const fromValue = '1';
        const toValue = '2';

        const propertyName = 'id';

        const values = [
            [fromValue, toValue],
            [`${fromValue},${toValue}`],
            `${fromValue},${toValue}`,
        ];

        const Entity = () => ({});

        mockColumns([
            {
                target: Entity,
                propertyName: propertyName,
            },
        ]);

        const filters = values.map((value) => ({
            [propertyName]: {
                between: value,
            },
        }));

        filters.forEach((filter) => {
            mockFilterQuery(filter);

            const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

            expect(filterObject).toEqual({
                [propertyName]: Between(fromValue, toValue),
            });
        });
    });

    it('should return an object with same In operator result by different filter values', () => {
        const firstValue = '1';
        const secondValue = '2';

        const propertyName = 'id';

        const values = [
            [firstValue, secondValue],
            [`${firstValue},${secondValue}`],
            `${firstValue},${secondValue}`,
        ];

        const Entity = () => ({});

        mockColumns([
            {
                target: Entity,
                propertyName: propertyName,
            },
        ]);

        const filters = values.map((value) => ({
            [propertyName]: {
                in: value,
            },
        }));

        filters.forEach((filter) => {
            mockFilterQuery(filter);

            const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

            expect(filterObject).toEqual({
                [propertyName]: In([firstValue, secondValue]),
            });
        });
    });

    it("should return an object with LIKE operator if filter is not in lower case ('LIKE', 'LiKe', etc.)", () => {
        const propertyName = 'id';
        const value = 1;

        const filters = {
            [propertyName]: {
                LIKE: value,
            },
        };

        const Entity = () => ({});

        mockFilterQuery(filters);
        mockColumns([
            {
                target: Entity,
                propertyName: propertyName,
            },
        ]);

        const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

        expect(filterObject).toEqual({
            [propertyName]: Like(value),
        });
    });

    it('should return chain of operators if filter operators are nested', () => {
        const propertyName = 'id';
        const value = 1;

        const filters = {
            [propertyName]: {
                not: {
                    null: value,
                },
            },
        };

        const Entity = () => ({});

        mockFilterQuery(filters);
        mockColumns([
            {
                target: Entity,
                propertyName: propertyName,
            },
        ]);

        const filterObject = filterFactory(Entity, mockContext as ExecutionContext);

        expect(filterObject).toEqual({
            [propertyName]: Not(IsNull()),
        });
    });
});
