"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const bot_config_1 = __importDefault(require("../Data/bot.config"));
class DiceRoll extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    events = new discord_js_1.Collection();
    config = bot_config_1.default;
    aliases = new discord_js_1.Collection();
    constructor() {
        super({ intents: 32767, });
    }
    async start() {
        // 커맨드
        const commandPath = path_1.default.join(__dirname, '..', 'Commands');
        (0, fs_1.readdirSync)(commandPath).forEach((dir) => {
            const commands = (0, fs_1.readdirSync)(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));
            for (const file of commands) {
                const { command, } = require(`${commandPath}/${dir}/${file}`);
                console.log(`[명령어] '${command.name}' 로드.`);
                this.commands.set(command.name, command);
                if (command.aliases) {
                    if (command.aliases.length !== 0) {
                        command.aliases.forEach((alias) => {
                            console.log(`[명령어 약어] '${alias}' 로드.`);
                            this.aliases.set(alias, command);
                        });
                    }
                }
            }
        });
        // 이벤트
        const eventPath = path_1.default.join(__dirname, '..', 'Events');
        (0, fs_1.readdirSync)(eventPath).forEach(async (file) => {
            const { event, } = await Promise.resolve().then(() => __importStar(require(`${eventPath}/${file}`)));
            this.events.set(event.name, event);
            console.log(`[이벤트] '${event.name}' 로드.`);
            this.on(event.name, event.run.bind(null, this));
        });
        // 로그인
        this.login(process.env.TOKEN);
    }
}
exports.default = DiceRoll;
