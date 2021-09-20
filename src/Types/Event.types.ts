import { ClientEvents } from 'discord.js';
import Client from '../Client';

interface Run {
  // eslint-disable-next-line no-unused-vars
  (client: Client, ...args: any[]);
}

export interface IEvent {
  name: keyof ClientEvents;
  run: Run;
}
