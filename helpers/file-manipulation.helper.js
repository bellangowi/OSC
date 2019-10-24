const _ = require('lodash');
const fs = require("fs");
const Promise = require('promise');


function writeToFile(dir, filename, data) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFile(`${dir}/${filename}`, JSON.stringify(data), (error) => {
            if (error) {
                console.log(err);
                reject(error);
            } else {
                console.log("Successfully Written to File.");
                resolve()
            }
        });
    })

}

async function readDataFromFile(dir, filename) {
    let data = []
    try {
        filename = await getSanitizedFileName(filename)
        const buffer = fs.readFileSync(`${dir}/${filename}.txt`);
        data = JSON.parse(buffer.toString());
    } catch (error) {
        console.log(JSON.stringify(error))
    } finally {
        return data
    }
}

async function writeMappedFormDataToTheFile(dir, formMapping) {
    const filenames = Object.keys(formMapping);
    try {
        for (let filename of filenames) {
            const data = formMapping[filename];
            filename = await getSanitizedFileName(filename)
            await writeToFile(dir, `${filename}.txt`, data);
        }
    } catch (error) {
        console.log(JSON.stringify(error))
    } finally {
        await writeToFile(dir, `form_name.txt`, _.join(filenames, " , "));
    }
}

async function getSanitizedFileName(filename) {
    filename = _.join(_.filter(filename.split("/"), key => key.trim() !== ""), "_");
    return _.join(_.filter(filename.split(" "), key => key.trim() !== ""), "_");
}

module.exports = { writeMappedFormDataToTheFile, readDataFromFile, writeToFile }