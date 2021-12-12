const execSync = require('child_process').execSync;

const arg = process.argv[2];

if (!arg) {
    throw new Error("No argument supplied")
}

execSync(`ts-node --project tsconfig.json src/${arg}`, {stdio:[0, 1, 2]});
