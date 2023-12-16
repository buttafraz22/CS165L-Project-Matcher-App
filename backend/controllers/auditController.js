const Audit = require("../models/audit");

async function createAudit(object, oldData, newData) {
    try {
        const audit = await Audit.create({
            objectId: object,
            oldData: oldData,
            newData: newData,
        });
        console.log('Audit created:', audit);
    } catch (error) {
        console.error('Error creating audit:', error);
    }
}

module.exports = {
    createAudit
}