const md = require("markdown-it")();
const fs = require("fs");
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)

module.exports = async function mdToHtml (mdPath, ejsPath) {
    let markdownText = await readFile(mdPath, "utf8");
    let result = await md.render(markdownText);
    await writeFile(ejsPath, result)
}

