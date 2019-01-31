const discord = require('discord.js')
const fs = require('fs')
const Json2csvParser = require('json2csv').Parser

const configFile = `${__dirname}/config.json`
const config = require(configFile)
const client = new discord.Client()

const commandName = config.commandName

const auditUsers = (message) => {
    console.log(message)
    let allMembers = []
    for (let m of message.guild.members.values()){
        if (m.user.bot == true) continue
        let member = {
            Name: m.user.username,
            Tag: m.user.tag,
            UserID: `<@${m.user.id}>`,
            JoinDate: m.joinedAt.toDateString()
        }
        let memberRoles = []
        for (let r of m.roles.values()){
            if (r.name != "@everyone") memberRoles.push(r.name)
        }
        member.Roles = memberRoles.join(', ')
        allMembers.push(member)
    }

    const json2csvParser = new Json2csvParser()
    const csv = json2csvParser.parse(allMembers)
    fs.writeFileSync(`./${message.guild.name}_audit.csv`, csv, {flag: 'w'}, function(err){
        if (err) consoleLog('Error saving CSV file:' + err.message, "ERR")
    })
}

const consoleLog = (msg="Unknown Status",type="") => {
    console.log(`${new Date().toISOString().slice(0,19).replace('T',' ')} [${type}](${commandName}): ${msg}`)
}

client.on('error', (err) => consoleLog(err.message,'ERR'))

client.on('ready', () => {
    consoleLog('Ready and connected to Discord.', "INFO")
})

client.on('message', async (message) => {
    let commandArgs = message.content.slice(config.commandPrefix.length).trim().split(/ +/g)
    let command = commandArgs.shift().toLowerCase()

    if (message.content.indexOf(config.commandPrefix) !== 0) return //If message does not have command prefix.
    if (message.author.bot) return //Ignore commands sent by bot users.
    else if (message.member.roles.some(role => config.allowedRoles.includes(role.name)) == false) return //Don't allow commands from unauthorized users.

    if (command == `${commandName}`) auditUsers(message)
    else return //If the command is not used by this bot.

    consoleLog(`Allowed command ${command} from ${message.member.user.username} on the ${message.member.guild.name} server.`, "INFO")
    message.delete(250)
})

client.login(config.discordToken)