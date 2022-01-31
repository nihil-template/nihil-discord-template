import { CommandInteractionOptionResolver } from 'discord.js';
import { client } from '..';
import { Event } from '@/structures/Event';
import { ExtendedInteraction } from '@/types/command.types';

export default new Event(
  'interactionCreate',
  async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
      await interaction.deferReply();
      const command = client.commands.get(interaction.commandName);
      if (!command) return interaction.followUp('명령어가 존재하지 않습니다.');

      command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtendedInteraction,
      });
    }
  }
);
