module.exports = {
  name: "set_role",
  description: "建立選擇身分組",
  devOnly: true,
  callback: async (client, interaction) => {
    await interaction.deferReply();
    const guild = interaction.member.guild;
    console.log(guild.roles.catch);

    interaction.editReply(`早安安`);
  },
};
