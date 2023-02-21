import type { CommandFunction } from '.';

export const startGame: CommandFunction<{}> = ({ room, state, client }) => {
	const players = [...state.players];

	if (players.length < 2) return;
	if (state.hostId !== client.sessionId) return;
	if (state.isGameStarted) return;

	state.isGameStarted = true;
	for (const [, player] of players) {
		player.rollDice();
	}

	const randomPlayer = players[Math.floor(Math.random() * players.length)];
	state.currentTurn = randomPlayer[0];
	state.currentDiceGuess = 0;
	state.currentCountGuess = 0;
	state.state = 'rolling-dice';

	room.clock.setTimeout(() => {
		state.state = 'playing';
	}, 3000);
};
