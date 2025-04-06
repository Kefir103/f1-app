import { spawn } from 'node:child_process';
import {
    getGlobalNextServerPidKey,
    MOCK_SERVER_HOSTNAME,
    MOCK_SERVER_PORT,
} from '~tests-utils/e2e/server/MockApiNextServerConfig.js';
import dotenv from 'dotenv';

const HOSTNAME = MOCK_SERVER_HOSTNAME;
const START_PORT = MOCK_SERVER_PORT;

dotenv.config({
    path: ['./.env', './.env.local'],
});

function startServer(port: number) {
    return new Promise((resolve) => {
        const serverPort = String(port);

        const child = spawn('node', [
            './__tests__/__utils__/e2e/server/MockApiNextServer.js',
            HOSTNAME,
            serverPort,
        ], {
            env: {
                ...process.env,
                API_URL: `http://${HOSTNAME}:${serverPort}`,
            }
        });

        // @ts-ignore
        global[getGlobalNextServerPidKey(HOSTNAME, serverPort)] = child.pid;

        child.stdout.on('data', (data) => {
            console.log(`${HOSTNAME}:${serverPort}: `, data.toString());

            if (data.toString().includes('Next Server is running')) {
                resolve(child);
            }
        });

        child.stderr.on('data', (data) => {
            console.log(`${HOSTNAME}:${serverPort}: `, data.toString());
        });

        child.on('close', (code) => {
            console.log(`${HOSTNAME}:${serverPort} closed with code: ${code}`);
        });
    });
}

export default async (params: { workers: number }) => {
    const promises = [];

    for (let i = 0; i < params.workers; i++) {
        promises.push(startServer(START_PORT + i));
    }

    await Promise.all(promises);

    console.log('All servers started');
};
