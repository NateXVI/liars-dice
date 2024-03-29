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

		const player = this.state.players.get(client.sessionId);
		if (this.state.scene === 'game-table') {
			player.diceLeft = 0;
		}

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
			this.state.scene = 'waiting-room';
		}
	}

	nextTurn() {
		const players = [...this.state.players]
			.sort((a, b) => a[1].order - b[1].order)
			.filter(([, player]) => player.diceLeft > 0);
		const currentPlayerIndex = players.findIndex(([id]) => id === this.state.currentTurn);
		const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
		this.state.tableState = 'playing';
		this.state.currentTurn = players[nextPlayerIndex][0];
	}

	nextRound(winnerId: string) {
		console.log({ winnerId, player: this.state.players.get(winnerId) });
		this.state.currentCountGuess = 0;
		this.state.currentDiceGuess = 0;
		this.state.guessedBy = '';
		this.state.currentTurn = winnerId;
		this.state.tableState = 'rolling-dice';

		[...this.state.players].forEach(([, player]) => {
			player.rollDice();
		});

		if (this.checkGameOver()) return;

		this.clock.setTimeout(() => {
			this.state.tableState = 'playing';
		}, 3000);
	}

	checkGameOver() {
		const players = [...this.state.players];
		const alivePlayers = players.filter(([, player]) => player.diceLeft > 0);
		if (alivePlayers.length <= 1) {
			this.state.winnerId = alivePlayers[0][0];
			this.state.tableState = 'game-over';
			this.clock.setTimeout(() => {
				this.state.scene = 'waiting-room';
			}, 10000);
			return true;
		}
		return false;
	}
}

function generateRoomId() {
	const possible = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
	return Array.from({ length: 4 }, () =>
		possible.charAt(Math.floor(Math.random() * possible.length))
	).join('');
}
