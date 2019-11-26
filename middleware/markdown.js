const md = require("markdown-it")();
const fs = require("fs");

async function mdToHtml (markdown) {
    let markdownText = await fs.readFile(markdown, "utf-8");
    let result = md.render(markdownText);
    await fs.writeFile(results, "test.html")
}

mdToHtml("test.md")