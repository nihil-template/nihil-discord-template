import { ColorResolvable } from 'discord.js';

interface ColorData {
  red: ColorResolvable;
}

export interface IConfigData {
  color: ColorData;
  version: string;
}
