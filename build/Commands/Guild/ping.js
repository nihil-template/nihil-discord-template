"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const bot_config_1 = __importDefault(require("../../Data/bot.config"));
exports.command = {
    name: '핑',
    description: `${bot_config_1.default.name}의 핑을 보여줍니다.`,
    aliases: ['p',],
    run: async (client, message, args, userId) => {
        const Ping = client.ws.ping;
        message.channel.send(`${userId} 현재 ***${client.user.username}***의 핑은 ***${Ping}ms*** 입니다.`);
    },
};
