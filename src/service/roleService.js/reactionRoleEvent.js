const { reaction_roles } = require("../../../config.json");
const { Events } = require("discord.js");
/**
 * 在指定訊息上添加反應會新增或移除身分組
 * @param {*} client 機器人本體
 */
module.exports = async (client) => {
  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    const guild = reaction.message.guild;
    const roleCache = guild.roles.cache;
    if (user.bot) return;
    if (!guild) return;
    //設定有多組訊息=>每個訊息可以對照多個身分組表情符號
    for (let reactionObj of reaction_roles) {
      if (reaction.message.id == reactionObj.message) {
        for (let element of reactionObj.roles) {
          const { sticker, roleName } = element;
          if (reaction.emoji.name === sticker) {
            const role = roleCache.find((role) => role.name === roleName);
            try {
              await reaction.message.guild.members.cache
                .get(user.id)
                .roles.add(role);
            } catch (error) {
              console.log(`無法添加${role.name}原因為${error}`);
            }
          }
        }
      }
    }
  });

  client.on(Events.MessageReactionRemove, async (reaction, user) => {
    const guild = reaction.message.guild;
    const roleCache = guild.roles.cache;
    if (user.bot) return;
    if (!guild) return;
    //設定有多組訊息=>每個訊息可以對照多個身分組表情符號
    for (let reactionObj of reaction_roles) {
      if (reaction.message.id == reactionObj.message) {
        for (let element of reactionObj.roles) {
          const { sticker, roleName } = element;
          if (reaction.emoji.name === sticker) {
            const role = roleCache.find((role) => role.name === roleName);
            try {
              await reaction.message.guild.members.cache
                .get(user.id)
                .roles.remove(role);
            } catch (error) {
              console.log(`無法刪除${role.name}原因為${error}`);
            }
          }
        }
      }
    }
  });
};
