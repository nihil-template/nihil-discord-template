import { MessageEmbed } from 'discord.js';
import { Command } from '@/structures/Command';
import { configData } from '@/data';

export default new Command({
  name: '핑',
  description: '현재 핑을 보여줍니다.',
  run: async ({ interaction, client, }) => {
    const { ping, } = client.ws;

    const embed = new MessageEmbed()
      .setColor(configData.color.red)
      .addField('**[핑]**', `***${ping}ms***`);

    await interaction.followUp({ embeds: [ embed, ], });
  },
});
