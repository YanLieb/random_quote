const { resolve } = require("path");
const { readFile } = require("fs/promises");
const { error } = require("console");

async function retrieveQuotes() {
  try {
    const filePath = resolve(__dirname, "quotes.json");
    const data = await readFile(filePath, { encoding: "UTF-8" });

    if (!data) throw new Error("The file is empty, or non existent");

    const { quotes } = JSON.parse(data);
    if (!quotes) throw new Error(`No quotes found in ${data}`);
    return quotes;
  } catch (err) {
    error(err.message);
    throw err;
  }
}

module.exports = {
  retrieveQuotes,
};
