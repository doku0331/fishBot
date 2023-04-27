const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = async (client) => {
  const serviceFolders = getAllFiles(
    path.join(__dirname, "..", "service"),
    true
  );

  for (const serviceFolder of serviceFolders) {
    const serviceFiles = getAllFiles(serviceFolder);
    const indexfile = serviceFiles.find((file) => file.includes("index.js"));

    const serviceFunction = require(indexfile);
    await serviceFunction(client);
  }
};
