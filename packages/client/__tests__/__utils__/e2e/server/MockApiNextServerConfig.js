const MOCK_SERVER_HOSTNAME = 'localhost';
const MOCK_SERVER_PORT = 3010;

function getGlobalNextServerPidKey(hostname, port) {
    return `SERVER_${hostname}:${port}_PID`;
}

module.exports = {
    MOCK_SERVER_HOSTNAME,
    MOCK_SERVER_PORT,
    getGlobalNextServerPidKey,
};
