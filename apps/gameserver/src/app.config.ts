import config from '@colyseus/tools';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { GameRoom } from './rooms/GameRoom';

export default config({
	getId: () => 'Liars Dice',
	initializeTransport: (options) => new WebSocketTransport(options),
	initializeGameServer: (gameServer) => {
		gameServer.define('game', GameRoom as any);
	},
	initializeExpress: (app) => {},
	beforeListen: () => {}
});
