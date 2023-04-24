require("dotenv").config();
const { Client, IntentsBitField, Events, Partials } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const reactionRoleEvent = require("./service/roleService.js/reactionRoleEvent");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

eventHandler(client);

client.login(process.env.TOKEN);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

//執行每次都會跑的服務
reactionRoleEvent(client);
