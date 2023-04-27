const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
/**
 * 註冊服務，每個服務都只有一個index.js作為進入點
 * @param {*} client 機器本體
 */
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
