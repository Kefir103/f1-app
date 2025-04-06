import {
    MOCK_SERVER_HOSTNAME,
    MOCK_SERVER_PORT,
    getGlobalNextServerPidKey,
} from '~tests-utils/e2e/server/MockApiNextServerConfig.js';

import treeKill from 'tree-kill';

const HOSTNAME = MOCK_SERVER_HOSTNAME;
const START_PORT = MOCK_SERVER_PORT;

export default async (params: { workers: number }) => {
    for (let i = 0; i < params.workers; i++) {
        // @ts-ignore
        treeKill(global[getGlobalNextServerPidKey(HOSTNAME, String(START_PORT + i))]);
    }

    console.log('All servers closed');
};
