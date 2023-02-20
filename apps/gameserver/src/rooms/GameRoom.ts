import { Dispatcher } from '@colyseus/command';
import { Client, Room } from 'colyseus';
import { GameState } from '../schemas/GameState';
import { Player } from '../schemas/Player';

export class GameRoom extends Room<GameState> {
	dispatcher = new Dispatcher(this);
	maxClients: number = 6;

	onCreate(options: any) {
		this.roomId = generateRoomId();

		this.setState(new GameState());

		this.onMessage('*', (client, type, message) => {
			console.log(client, type, message);
		});
	}

	onJoin(client: Client, options: { name: string }, auth?: any) {
		this.broadcast('message', `${client.sessionId} joined.`);
		console.log(options);
		const name =
			typeof options.name === 'string' && options.name.trim().length > 0
				? options.name.trim()
				: 'Anonymous';
		this.state.players.set(client.sessionId, new Player({ name }));

		if (this.state.hostId === undefined) {
			this.state.hostId = client.sessionId;
		}
	}

	onLeave(client: Client, consented?: boolean | undefined) {
		this.broadcast('message', `${client.sessionId} left.`);
		this.state.players.delete(client.sessionId);

		if (this.state.hostId === client.sessionId && this.clients.length > 0) {
			const newHost = this.clients[0];
			this.state.hostId = newHost.sessionId;
		}
	}
}

function generateRoomId() {
	const possible = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
	return Array.from({ length: 4 }, () =>
		possible.charAt(Math.floor(Math.random() * possible.length))
	).join('');
}
