const next = require('next');
const path = require('path');
const { Server } = require('node:http');

const HOSTNAME = process.argv[2];
const PORT = parseInt(process.argv[3], 10);

const MockData = new Map();

function getBody(request) {
    return new Promise((resolve) => {
        const bodyParts = [];

        request
            .on('data', (chunk) => {
                bodyParts.push(chunk);
            })
            .on('end', () => {
                resolve(JSON.parse(Buffer.concat(bodyParts).toString()));
            });
    });
}

function getMockDataKey(method, url, searchParams = '') {
    return `http://${HOSTNAME}:${PORT} (${method.toUpperCase()}) ${url}${
        searchParams.length ? `?${searchParams}` : ''
    }`;
}

async function startServer() {
    const app = next({
        dev: false,
        dir: path.resolve(__dirname, '../../../..'),
        hostname: HOSTNAME,
        port: PORT,
    });

    const handle = app.getRequestHandler();

    await app.prepare();

    const MockServer = new Server(async (req, res) => {
        const route = req.url;
        const requestMethod = req.method;

        const searchParams = route.split('?')[1];

        if (route.startsWith('/set-mock')) {
            const { status, body, endpoint, method } = await getBody(req);

            MockData.set(getMockDataKey(method, endpoint, searchParams), {
                status,
                body,
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end();

            return;
        }

        if (route === '/clear-mock') {
            MockData.clear();

            console.log('clear mock');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end();

            return;
        }

        if (route.startsWith('/api')) {
            if (MockData.has(getMockDataKey(requestMethod, route))) {
                const { status, body } = MockData.get(getMockDataKey(requestMethod, route));

                res.writeHead(status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(body));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end();
            }

            return;
        }

        return handle(req, res);
    });

    MockServer.listen(PORT, () => {
        console.log(`Next Server is running on http://${HOSTNAME}:${PORT}`);
    });
}

startServer();
