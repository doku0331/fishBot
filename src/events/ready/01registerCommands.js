const { GuildApplicationCommandManager } = require("discord.js");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    //取得現有的指令
    const localCommands = getLocalCommands();
    //取得機器人有哪些伺服器
    const guildList = client.guilds.cache.map((guild) => guild.id);

    //逐一更新每個伺服器的指令清單
    for (gulidId of guildList) {
      const applicationCommands = await getApplicationCommands(client, gulidId);

      registCommand(localCommands, applicationCommands);
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};

/**
 * 把指令更新或註冊discord
 * @param {Array} localCommands 現在有的指令
 * @param {GuildApplicationCommandManager} remoteCommand 已經被註冊上的指令
 */
const registCommand = async (localCommands, remoteCommand) => {
  for (const localCommand of localCommands) {
    const { name, description, options } = localCommand;

    const existingCommand = await remoteCommand.cache.find(
      (cmd) => cmd.name === name
    );

    if (existingCommand) {
      if (localCommand.deleted) {
        await remoteCommand.delete(existingCommand.id);
        console.log(`🗑 Deleted command "${name}".`);
        continue;
      }

      if (areCommandsDifferent(existingCommand, localCommand)) {
        await remoteCommand.edit(existingCommand.id, {
          description,
          options,
        });

        console.log(`🔁 Edited command "${name}".`);
      }
    } else {
      if (localCommand.deleted) {
        console.log(
          `⏩ Skipping registering command "${name}" as it's set to delete.`
        );
        continue;
      }

      await remoteCommand.create({
        name,
        description,
        options,
      });

      console.log(`👍 Registered command "${name}"`);
    }
  }
};
