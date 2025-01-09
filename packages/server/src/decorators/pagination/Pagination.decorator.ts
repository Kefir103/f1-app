import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IPaginationParams {
    page?: number;
    perPage?: number;
}

export const PaginationParams = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): IPaginationParams => {
        const request = ctx.switchToHttp().getRequest();

        return {
            page: +request.query.page || 1,
            perPage: +request.query.perPage || 50,
        };
    },
);
