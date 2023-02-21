import { Dispatcher } from '@colyseus/command';
import { Client, Delayed, Room } from 'colyseus';
import { GameState } from '../../schemas/GameState';
import { Player } from '../../schemas/Player';
import { commands, type CommandType } from './commands';

export class GameRoom extends Room<GameState> {
	dispatcher = new Dispatcher(this);
	maxClients: number = 6;

	onCreate(options: any) {
		this.clock.start();
		this.roomId = generateRoomId();

		this.setState(new GameState());

		this.onMessage('*', (client, type, message) => {
			const command = commands[type as CommandType];
			if (!command) {
				console.error(`Command ${type} not found`);
				return;
			}
			command({ room: this, state: this.state, client, message });
		});
	}

	onJoin(client: Client, options: { name: string }, auth?: any) {
		this.broadcast('message', `${client.sessionId} joined.`);
		const name =
			typeof options.name === 'string' && options.name.trim().length > 0
				? options.name.trim()
				: 'Anonymous';

		const players = [...this.state.players].sort((a, b) => a[1].order - b[1].order);
		const order = players.length > 0 ? players[players.length - 1][1].order + 1 : 0;
		this.state.players.set(client.sessionId, new Player({ id: client.sessionId, name, order }));

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
		if ([...this.state.players].length === 1) {
			this.state.isGameStarted = false;
		}
	}

	nextTurn() {
		const players = [...this.state.players]
			.sort((a, b) => a[1].order - b[1].order)
			.filter(([, player]) => player.diceLeft > 0);
		const currentPlayerIndex = players.findIndex(([id]) => id === this.state.currentTurn);
		const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
		this.state.currentTurn = players[nextPlayerIndex][0];
	}

	nextRound(winnerId: string) {
		// TODO: handle next round logic
		this.state.currentCountGuess = 0;
		this.state.currentDiceGuess = 0;
		this.state.currentTurn = winnerId;
		this.state.state = 'rolling-dice';
		this.clock.setTimeout(() => {
			this.state.state = 'playing';
		}, 3000);
		[...this.state.players].forEach(([, player]) => {
			player.rollDice();
		});
	}
}

function generateRoomId() {
	const possible = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
	return Array.from({ length: 4 }, () =>
		possible.charAt(Math.floor(Math.random() * possible.length))
	).join('');
}
