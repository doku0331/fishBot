const {
  ApplicationCommandOptionType,
  InteractionType,
  BaseInteraction,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "eat_what",
  description: "幫你決定晚餐吃啥，不選選項就是鹹魚幫你決定",
  options: [
    {
      name: "food_one",
      description: "你想吃的?",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "food_two",
      description: "你想吃的?",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "food_three",
      description: "你想吃的?",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "food_four",
      description: "你想吃的?",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  /**
   *
   * @param {*} client
   * @param {InteractionType} interaction
   * @returns
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();

    const options = interaction.options;
    let foods = [
      options?.get("food_one")?.value,
      options?.get("food_two")?.value,
      options?.get("food_three")?.value,
      options?.get("food_four")?.value,
    ];
    foods = foods.filter((item) => item != undefined);
    if (foods.length === 0) {
      foods = ["吃屎", "摩斯漢堡", "麥當勞", "爭鮮", "永和豆漿"];
    }

    //回應吃啥
    interaction.editReply(
      foods[Math.floor(Math.random() * foods.length)] + "，訊息在五秒後自動刪除"
    );
    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  },
};
