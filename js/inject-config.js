const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the template config file
const configTemplate = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');

// Replace environment variables
const configContent = configTemplate.replace(
    /process\.env\.([A-Z_]+)/g,
    (match, key) => `"${process.env[key] || ''}"`
);

// Write the processed config file
fs.writeFileSync(path.join(__dirname, 'config.processed.js'), configContent); 