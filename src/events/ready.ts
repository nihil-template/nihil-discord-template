import { Event } from '@/structures/Event';

export default new Event(
  'ready',
  (client) => {
    console.log(`[ 시스템 ] ${client.user.username} 활성화 완료.`);
  }
);
