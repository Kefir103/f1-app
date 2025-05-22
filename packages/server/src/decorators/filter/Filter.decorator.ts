import {
    getMetadataArgsStorage,
    Equal,
    Not,
    Like,
    LessThan,
    LessThanOrEqual,
    MoreThan,
    MoreThanOrEqual,
    ILike,
    IsNull,
    Between,
    In,
    Or,
    And,
} from 'typeorm';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { isObject } from '~utils/is-object';

const FILTERS = {
    '=': (value: any) => Equal(value),
    '!=': (value: any) => Not(value),
    '<': (value: any) => LessThan(value),
    '<=': (value: any) => LessThanOrEqual(value),
    '>': (value: any) => MoreThan(value),
    '>=': (value: any) => MoreThanOrEqual(value),
    like: (value: any) => Like(value),
    ilike: (value: any) => ILike(value),
    not: (value: any) => Not(value),
    null: () => IsNull(),
    between: (value: any[] | string) => {
        return Between.call(null, ...getArrayPossibleFilter(value));
    },
    in: (value: any[] | string) => In(getArrayPossibleFilter(value)),
    or: (value: any) => Or(value),
    and: (value: any) => And(value),
};

const filterColumns = (entity: EntityClassOrSchema, filters: object) => {
    const metadataArgsStorage = getMetadataArgsStorage();

    const entityColumns = metadataArgsStorage.filterColumns(entity as () => EntityClassOrSchema);

    if (!entityColumns?.length) {
        return {};
    }

    const filterColumns = Object.keys(filters).filter(
        (columnName: string) =>
            !!entityColumns.find(({ propertyName }) => propertyName === columnName),
    );

    return filterColumns.reduce(
        (acc, columnName) => ({
            ...acc,
            [columnName]: filters[columnName],
        }),
        {},
    );
};

const getTypeormFilters = (filterColumns: object): object => {
    const resultFilters = {};

    for (const [key, value] of Object.entries(filterColumns)) {
        const filterValue = isObject(value) ? getTypeormFilters(value) : value;

        if (Object.prototype.hasOwnProperty.call(FILTERS, key.toLowerCase())) {
            return FILTERS[key.toLowerCase()](filterValue);
        }

        resultFilters[key] = filterValue;
    }

    return resultFilters;
};

const getArrayPossibleFilter = (value: any | any[]): any[] => {
    if (!value) {
        return [];
    }

    if (typeof value === 'string') {
        return value.split(',');
    }

    if (Array.isArray(value) && value.length === 1 && typeof value[0] === 'string') {
        return value[0].split(',');
    }

    return value;
};

export const filterFactory = (entity: EntityClassOrSchema, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const filter = request.query?.filter;

    if (!Object.keys(filter || {})!.length) {
        return {};
    }

    const filteredColumns = filterColumns(entity, filter);

    return getTypeormFilters(filteredColumns);
};

export const FilterParams = createParamDecorator(filterFactory);
