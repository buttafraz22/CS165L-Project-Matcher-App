const Log = require("../models/log");

async function createLog(error) {
    const stackMatch = error.stack.match(/at\s.*\((.*):(\d+):(\d+)\)/);

    if (stackMatch) {
        const [, fileName, rowNumber, columnNumber] = stackMatch;
        console.log(parseInt(columnNumber, 10));
        console.log(parseInt(rowNumber, 10));
        const newLog = await Log({
            errorType: error.name,
            fileName,
            columnNum: parseInt(columnNumber, 10),
            rowNum: parseInt(rowNumber, 10),
            activeStatus: true,
        });

        await newLog.save();
    } else {
        console.error('Unable to extract file, row, and column information from stack trace.');
    }
}

module.exports = {
    createLog
}