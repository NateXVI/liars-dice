import Arena from '@colyseus/arena';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { GameRoom } from './rooms/GameRoom';

export default Arena({
	getId: () => 'Liars Dice',
	initializeTransport: (options) => new WebSocketTransport(options),
	initializeGameServer: (gameServer) => {
		gameServer.define('game', GameRoom);
	},
	initializeExpress: (app) => {},
	beforeListen: () => {}
});
