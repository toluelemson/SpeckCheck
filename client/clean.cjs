const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// This function will delete the .js file for a given .ts file if it exists
function deleteJSIfExists(tsFilePath) {
    const jsFilePath = tsFilePath.replace(/\.ts$/, '.js');
    if (fs.existsSync(jsFilePath)) {
        rimraf.sync(jsFilePath);
    }
}

// This function will recursively search for .ts files and apply the delete function
function searchAndDeleteJSFiles(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            searchAndDeleteJSFiles(fullPath);
        } else if (fullPath.endsWith('.ts')) {
            deleteJSIfExists(fullPath);
        }
    }
}

// Start the script from your src directory
searchAndDeleteJSFiles('./src');
