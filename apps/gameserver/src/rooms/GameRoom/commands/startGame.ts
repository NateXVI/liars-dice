import type { CommandFunction } from '.';

export const startGame: CommandFunction<{}> = ({ room, state, client }) => {
	const players = [...state.players];

	if (players.length < 2) return;
	if (state.hostId !== client.sessionId) return;
	if (state.scene === 'game-table') return;

	state.scene = 'game-table';
	for (const [, player] of players) {
		player.diceLeft = 6;
		player.rollDice();
	}

	const randomPlayer = players[Math.floor(Math.random() * players.length)];
	state.currentTurn = randomPlayer[0];
	state.previousDiceGuess = 0;
	state.previousCountGuess = 0;
	state.currentDiceGuess = 0;
	state.currentCountGuess = 0;
	state.guessedBy = '';
	state.revealedDice = 0;
	state.liarCalledBy = '';
	state.winnerId = '';
	state.tableState = 'rolling-dice';
	state.scene = 'game-table';

	room.clock.setTimeout(() => {
		state.tableState = 'playing';
	}, 3000);
};
