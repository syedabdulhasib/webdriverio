const { expect, browser, $ } = require('@wdio/globals')

const {
    cloneConfiguration,
    initializeStatus,
    checkStatusAndWait,
    releaseStatus,
    replaceConfiguration
} = require('./configManager');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await browser.pause(2000);

        //Replace the folder when the files are served to the chrome browser
        replaceConfiguration();

        //Update the status to file.
        releaseStatus();

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()
    })
})

