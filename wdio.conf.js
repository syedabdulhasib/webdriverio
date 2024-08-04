const {
    cloneConfiguration,
    initializeStatus,
    checkStatusAndWait,
    releaseStatus,
    replaceConfiguration
} = require('./configManager');

// Clone configuration folder and initialize status file
cloneConfiguration();
initializeStatus();

exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['visual'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    before: async function (capabilities, specs) {
        await checkStatusAndWait();
    },
    after: function (result, capabilities, specs) {
        replaceConfiguration();
        releaseStatus();
    }
};
