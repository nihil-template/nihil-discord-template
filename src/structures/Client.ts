import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import { CommandType } from '@/types/command.types';
import { RegisterCommandsOptions } from '@/types/client.types';
import { Event } from '@/structures/Event';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

  constructor() {
    super({ intents: 32767, });
  }

  start() {
    this.registerModules();
    this.login(process.env.TOKEN);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, }: RegisterCommandsOptions) {
    await this.application?.commands.set(commands);
  }

  async registerModules() {
    // Slash Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const slashCommandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);

    slashCommandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;

      console.log(`[ 시스템 ] 빗금 명령어 ${command.name} 로딩 완료.`);
      this.commands.set(command.name, command);
      slashCommands.push(command);
    });

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
      });
    });

    // Event
    const eventFiles = await globPromise(
      `${__dirname}/../events/*{.ts,.js}`
    );

    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);

      console.log(`[ 시스템 ] 이벤트 ${event.event} 로딩 완료.`);
      this.on(event.event, event.run);
    });
  }
}
