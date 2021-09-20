import { IEvent } from '../Types';

export const event: IEvent = {
  name: 'ready',
  run: (client) => {
    console.log(`[상태] '${client.user.username} - v${client.config.version}' 활성화 완료.`);
  },
};
