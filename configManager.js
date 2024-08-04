const fs = require('fs-extra');
const path = require('path');

// Define paths for configuration folders and status file
const BASE_FOLDER = 'C:\\app-data\\Configuration';
const CLONED_FOLDER = 'C:\\app-data\\mainconfiguration';
const STATUS_FILE = 'C:\\app-data\\status.json';

// Function to clone the base configuration folder to mainconfiguration
function cloneConfiguration() {
    if (!fs.existsSync(CLONED_FOLDER)) {
        fs.copySync(BASE_FOLDER, CLONED_FOLDER);
        console.log('Configuration folder cloned to mainconfiguration.');
    } else {
        console.log('mainconfiguration already exists.');
    }
}

// Function to initialize status.json if it does not exist
function initializeStatus() {
    if (!fs.existsSync(STATUS_FILE)) {
        fs.writeJsonSync(STATUS_FILE, { status: 'off' });
        console.log('Initialized status.json with status: off.');
    }
}

// Function to check the status and wait if necessary until status is 'off'
async function checkStatusAndWait() {
    for (let i = 0; i < 6; i++) { // 6 attempts, 10 seconds apart = 1 minute
        let status = fs.readJsonSync(STATUS_FILE);

        if (status.status === 'off') {
            status.status = 'on';
            fs.writeJsonSync(STATUS_FILE, status);
            console.log('Configuration locked for editing.');
            return true;
        } else {
            console.log('Waiting for configuration to be available...');
            await new Promise(res => setTimeout(res, 10000)); // Wait for 10 seconds
        }
    }
    throw new Error('Could not acquire lock on configuration within 1 minute.');
}

// Function to release the status lock by setting status to 'off'
function releaseStatus() {
    let status = fs.readJsonSync(STATUS_FILE);

    if (status.status === 'on') {
        status.status = 'off';
        fs.writeJsonSync(STATUS_FILE, status);
        console.log('Configuration unlocked.');
    }
}

// Function to replace the configuration folder with the cloned one
function replaceConfigurationFolder() {
    if (fs.existsSync(CLONED_FOLDER)) {
        fs.removeSync(BASE_FOLDER); // Remove the existing configuration folder
        fs.renameSync(CLONED_FOLDER, BASE_FOLDER); // Rename mainconfiguration to configuration
        console.log('Replaced configuration folder with mainconfiguration.');
    } else {
        console.log('mainconfiguration folder does not exist. Cannot replace configuration.');
    }
}

module.exports = {
    cloneConfiguration,
    initializeStatus,
    checkStatusAndWait,
    releaseStatus,
    replaceConfigurationFolder
};
