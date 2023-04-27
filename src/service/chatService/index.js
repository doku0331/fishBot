const { Events } = require("discord.js");

/**
 * 聊天功能
 * TODO: 把聊天訊息跟回應抽出來 讓外部注入
 * @param {*} client 機器人本體
 */
module.exports = (client) => {
  client.on(Events.MessageCreate, async (message) => {
    //判斷不回應的條件訊息
    let isMention = message.mentions.has(client.user.id);
    let isAllMention =
      message.content.includes("@here") ||
      message.content.includes("@everyone") ||
      message.type == "REPLY";
    let isBotMessage = message.author.bot;
    if (!isMention || isAllMention || isBotMessage) {
      return;
    }
    //回應可以一直加上 記得return

    //回應愛你
    const text = message.content;
    if (text.includes("愛")) {
      message.reply("愛過 沒錢 不約");
      return;
    }

    //回應吃啥
    if (text.includes("吃什麼") || text.includes("吃啥")) {
      const food = ["吃屎", "摩斯漢堡", "麥當勞", "爭鮮", "永和豆漿"];
      message
        .reply(food[Math.floor(Math.random() * food.length)])
        .then((replyMessage) => {
          setTimeout(() => {
            message.delete();
            replyMessage.delete();
          }, 5000);
        });
      return;
    }

    //預設的回答 沒觸發到上面的話
    const defaultReply = [
      "滾",
      "問題不大",
      "幹(丟出窗戶)",
      "還不錯?",
      "哀斗...",
      "凹ㄨ....",
      "等等回來 我先洗澡",
    ];
    message.reply(
      defaultReply[Math.floor(Math.random() * defaultReply.length)]
    );
  });
};
