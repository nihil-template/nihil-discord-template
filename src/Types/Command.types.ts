import { Message } from 'discord.js';
import Client from '@/Client';

interface Run {
  // eslint-disable-next-line no-unused-vars
  (client: Client, message: Message, args: string[], userId: string);
}

export interface ICommand {
  name: string;
  description?: string;
  aliases?: string[];
  run: Run;
}
