"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: 'messageCreate',
    run: (client, message) => {
        if (message.author.bot
            || !message.guild
            || !message.content.startsWith(client.config.prefix))
            return;
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if (!cmd)
            return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        const userId = `<@${message.author.id}>`;
        if (!command)
            return message.channel.send(`${userId} ***${args[0]}***라는 명령어는 존재하지 않습니다.`);
        if (command)
            command.run(client, message, args, userId);
    },
};