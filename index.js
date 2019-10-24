
const dataElements = require('./helpers/dataelements.helper');

const {
    sourceConfig,
} = require('./config/index');

const sourceHeaders = {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + new Buffer.from(`${sourceConfig.username}:${sourceConfig.password}`).toString('base64')
};

const souceServerUrl = sourceConfig.url;
const outputFolder = sourceConfig.output_folder

startApp();
async function startApp() {
    await discoveringAndSaveFormData();
    console.log(data)
}

async function discoveringAndSaveFormData() {
    let formMapping = {}
    try {
        const filters = await getFilterParameter(souceServerUrl, sourceHeaders);
        for (const filter of filters) {
            const response = await discoveringFormData(souceServerUrl, sourceHeaders);
            const { objects } = response;
            formMapping = await getDataMappingFromResponseObject(objects, formMapping);
            await writeMappedFormDataToTheFile(outputFolder, formMapping);
        }
    } catch (error) {
        console.log({ error })
    }
}