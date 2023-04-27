const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

/**
 * 刪除所有指令用
 * @param {*} guildList 伺服器清單
 */
const deleteAllCommand = async (guildList) => {
  for (id of guildList) {
    // for guild-based commands
    await rest.put(
      Routes.applicationGuildCommands(process.env.APPLICATION_ID, id),
      {
        body: [],
      }
    );
    console.log("Successfully deleted all guild commands.");
  }

  // for global commands
  await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
    body: [],
  });
  console.log("Successfully deleted all application commands.");
};

module.exports = deleteAllCommand;
