export function PaginationMiddleware(req: any, _: any, next: (error?: any) => void) {
    req.query.page = +req.query.page || 1;
    req.query.perPage = +req.query.perPage || 10;

    next();
}
