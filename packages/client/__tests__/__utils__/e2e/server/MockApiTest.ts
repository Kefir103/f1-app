// @ts-nocheck
import { test as base } from '@playwright/test';
import axios, { AxiosRequestConfig } from 'axios';
import {
    MOCK_SERVER_HOSTNAME,
    MOCK_SERVER_PORT,
} from '~tests-utils/e2e/server/MockApiNextServerConfig.js';

const AVAILABLE_METHODS = ['get', 'post', 'patch', 'delete'] as const;

type METHOD_NAME = (typeof AVAILABLE_METHODS)[number];

type NextContext = {
    mockApi: Record<
        METHOD_NAME,
        (endpoint: string, body: Record<string, any>, config?: AxiosRequestConfig) => Promise<void>
    >;
};

export const test = base.extend<{
    nextContext: NextContext;
    baseURL: string;
    page: Page;
}>({
    baseURL: async ({}, use, testInfo) => {
        const port = MOCK_SERVER_PORT + testInfo.parallelIndex;

        await use(`http://${MOCK_SERVER_HOSTNAME}:${port}`);
    },
    page: async ({ baseURL, context }, use) => {
        const newPage = await context.newPage();

        await newPage.goto(baseURL);

        await use(newPage);
    },
    nextContext: [
        async ({}, use, testInfo) => {
            const port = MOCK_SERVER_PORT + testInfo.parallelIndex;

            const baseUrl = `http://${MOCK_SERVER_HOSTNAME}:${port}`;

            await use({
                mockApi: AVAILABLE_METHODS.reduce(
                    (acc, method) => ({
                        ...acc,
                        [method]: async (
                            endpoint: string,
                            body: Record<string, any>,
                            config = {},
                        ) => {
                            await axios({
                                ...config,
                                baseURL: baseUrl,
                                url: '/set-mock',
                                method: 'POST',
                                data: {
                                    status: 200,
                                    endpoint,
                                    body,
                                    method,
                                },
                            });
                        },
                    }),
                    {},
                ),
            });

            await axios.get(`${baseUrl}/clear-mock`);
        },
        {
            scope: 'test',
        },
    ],
});
