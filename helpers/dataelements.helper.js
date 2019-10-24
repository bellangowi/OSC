const _ = require('lodash');

async function discoveringAndSaveDataElements(
    serverUrl,
    headers,
    dataElementsFolder
) {
    let mapping = {};
    try {
        console.log(`Dicovering dataelement paginations`);
        const filters = await getDataElementPaginations(serverUrl, headers);
        for (const filter of filters) {
            console.log(`Dicovering dataelement by pagination : ${filter}`);
            const response = await discoveringDataElements(
                serverUrl,
                headers,
                filter
            );
            const { dataElements } = response;
            mapping = await dataManipulation.getDataElementFromResponseObject(
                dataElements,
                mapping
            );
            await fileManipulation.writeToFile(
                dataElementsFolder,
                'dataElements.txt',
                mapping
            );
        }
    } catch (error) {
        console.log(JSON.stringify({ type: 'dataElements', error }));
    } finally {
        return;
    }
}

async function getdataElementsPaginations(serverUrl, headers) {
    const pageSize = 200;
    const url = `${serverUrl}/api/dataElements?fields=none&pageSize=${pageSize}`;
    const filters = [];
    try {
        const body = await http.getHttp(headers, url);
        const { pager } = body;
        const { pageCount } = pager;

        for (let i = 1; i <= pageCount; i++) {
            filters.push(`pageSize=${pageSize}&page=${i}`);
        }
    } catch (error) {
        console.log({ error, type: url });
    } finally {
        return filters;
    }
}

async function discoveringDataElements(serverUrl1, headers, filter) {
    const url = `${serverUrl1}/api/dataElements.json?fields=id,name&${filter}`;
    let data = { dataElements: [] };
    try {
        const body = await http.getHttp(headers, url);
        data = {...data, ...body };
    } catch (error) {
        console.log({ error, type: url });
    } finally {
        return data;
    }
}

module.exports = {
    discoveringAndSaveDataElements
};