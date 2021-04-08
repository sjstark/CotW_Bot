require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const BOT_TOKEN = process.env.BOT_TOKEN
const SERVER_ID = process.env.SERVER_ID
const ROLE_ID = process.env.ROLE_ID
const SPECIAL_COMMAND = process.env.SPECIAL_COMMAND

bot.login(BOT_TOKEN)


let special_color_role

bot.on('ready', () => {
  let server = bot.guilds.cache.get(SERVER_ID)
  // console.log(server)
  special_color_role = server.roles.cache.get(ROLE_ID)
  // console.log(special_color_role)
  console.info(`Logged in as ${bot.user.tag}
  Listening on #${server.name} and applying to @${special_color_role.name}
  Listening for ${SPECIAL_COMMAND}`)
})

bot.on("message", msg => {
  if (msg.channel.type !== 'text') { return }
  if (msg.author.bot) return;
  // This is where we'll put our code.

  // check for special role
  if (!msg.member.roles.cache.has(ROLE_ID)) return;

  if (msg.content.startsWith(SPECIAL_COMMAND)) {
    let color = msg.content.trim().split(' ')[1]
    if (! /^#[0-9a-f]{6}/.test(color)) {
      msg.channel.send(`Please provide an six digit hex color after command.`)
      return
    }
    msg.channel.send(`Changing ${msg.author.username}'s color to ${color}! Aren't you a special lil snowflake?`);
    special_color_role.setColor(color)
  }
});
