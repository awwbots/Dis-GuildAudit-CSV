# Dis-GuildAudit-CSV
Export list of Discord guild members to CSV

## Setup

Requires <a href="https://nodejs.org/">Node.js</a>. 8.10.x or latest LTS version recommended.

### Discord Bot Access

Requires a Discord Bot with Read/Write/Manage permissions.

* <a href="https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token">How to create a Discord Bot & Getting a Token</a>

### Installation

1. Clone or download/extract repository to local computer.
2. Launch command/terminal, navigate to the ".../Dis-GuildAudit-CSV/" directory that you created in the previous step.
3. Run "npm install". 
4. Rename "config.example.json" to "config.json"
5. Open config.json, complete any of the missing fields, and modify the allowedRoles to include the Discord Server roles that you want to have access the command. You can also modify the command and/or prefix within the config.json as you wish.
6. Run "npm start" to start the Discord bot.
7. From the Discord server you want to audit, run the command that you entered in the config.json.
8. The CSV file will be saved to the ".../Dis-GuildAudit-CSV/" directory.
