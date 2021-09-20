"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: 'ready',
    run: (client) => {
        console.log(`[상태] '${client.user.username} - v${client.config.version}' 활성화 완료.`);
    },
};
