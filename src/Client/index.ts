import { Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs';
import { ICommand, IConfig, IEvent } from '../Types';
import botConfig from '../Data/bot.config';

interface ImportType {
  command?: ICommand;
  event?: IEvent;
}

class DiceRoll extends Client {
  public commands: Collection<string, ICommand> = new Collection();
  public events: Collection<string, IEvent> = new Collection();
  public config: IConfig = botConfig;
  public aliases: Collection<string, ICommand> = new Collection();

  public constructor() {
    super({ intents: 32767, });
  }

  public async start() {
    // 커맨드
    const commandPath = path.join(__dirname, '..', 'Commands');
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));

      for (const file of commands) {
        const { command, }: ImportType = require(`${commandPath}/${dir}/${file}`);

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
    const eventPath = path.join(__dirname, '..', 'Events');
    readdirSync(eventPath).forEach(async (file) => {
      const { event, }: ImportType = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);

      console.log(`[이벤트] '${event.name}' 로드.`);
      this.on(event.name, event.run.bind(null, this));
    });

    // 로그인
    this.login(process.env.TOKEN);
  }
}

export default DiceRoll;
