module.exports = (client, message) => {
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

  //回應愛你
  const text = message.content;
  if (text.includes("愛")) {
    message.reply("愛過 沒錢 不約");
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
  }
};
