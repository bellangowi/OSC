const _ = require('lodash');

async function getDataElementFromResponseObject(responseDataElements, dataElementObject) {   
    for (const responseDataElement of responseDataElements) {
        const { name, id } = responseDataElement;
        dataElementObject[name]=id
    }
    return dataElementObject
}

module.exports = { getDataElementFromResponseObject }