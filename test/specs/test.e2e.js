const { expect, browser, $ } = require('@wdio/globals')

const {
    cloneConfiguration,
    initializeStatus,
    checkStatusAndWait,
    releaseStatus,
    replaceConfigurationFolder
} = require('../../configManager');

beforeEach(async () => {
    // Clone configuration folder and initialize status file
    cloneConfiguration();
    initializeStatus();

    // Check the status and wait if necessary
    await checkStatusAndWait();
});

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await browser.pause(5000);
        // Replace the configuration folder with the cloned one
        replaceConfigurationFolder();

        // Release the status lock
        releaseStatus();

        await browser.pause(45000);

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()
    })
})