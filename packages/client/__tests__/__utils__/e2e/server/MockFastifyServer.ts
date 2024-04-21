import path from 'node:path';
import Fastify, { FastifyInstance } from 'fastify';
import type { RouteOptions } from 'fastify/types/route';
import dotenv from 'dotenv';

const ROOT_PATH = path.resolve(__dirname, '../../../../');

dotenv.config({
    path: path.resolve(ROOT_PATH, '.env.local'),
});

const PORT = Number(process.env.MOCK_SERVER_PORT);

export const createServer = () => {
    return Fastify({
        logger: true,
    });
};

export const setupServer = async (server: FastifyInstance, ...routes: RouteOptions[]) => {
    routes.forEach((route) => {
        server.route(route);
    });

    try {
        await server.listen({
            port: PORT || 4000,
        });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

export const closeServer = async (server: FastifyInstance) => {
    await server.close();
};
