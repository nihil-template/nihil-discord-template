import { CommandType } from '@/types/command.types';

export class Command {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}
