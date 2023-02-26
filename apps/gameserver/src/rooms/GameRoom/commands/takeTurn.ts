import type { CommandFunction } from '.';

type TakeTurnArgs =
	| {
			action: 'raise';
			dice: number;
			count: number;
	  }
	| {
			action: 'liar';
	  };

export const takeTurn: CommandFunction<TakeTurnArgs> = ({ room, state, client, message }) => {
	console.log({ message });
	if (state.tableState !== 'playing') return;
	if (message.action === 'raise') {
		if (client.sessionId !== state.currentTurn) return;

		// state.tableState = 'revealing-answer';
		const { dice, count } = message;
		state.previousDiceGuess = state.currentDiceGuess;
		state.previousCountGuess = state.currentCountGuess;
		state.previousGuessedBy = state.guessedBy;
		state.currentDiceGuess = dice;
		state.currentCountGuess = count;
		state.tableState = 'revealing-answer';
		state.guessedBy = client.sessionId;

		room.clock.setTimeout(() => {
			room.nextTurn();
		}, 5000);
	} else if (message.action === 'liar') {
		if (client.sessionId === state.guessedBy || state.guessedBy === undefined) return;

		const player = state.players.get(client.sessionId);
		const guesser = state.players.get(state.guessedBy);

		if (player === undefined || player.diceLeft <= 0) return;

		state.tableState = 'called-liar';

		room.clock.setTimeout(() => {
			state.tableState = 'revealing-liar';
		}, 3000);

		room.clock.setTimeout(() => {
			const allDice = [...state.players.values()].flatMap((player) => [...player.dice]);
			const diceCount = allDice.filter(
				(dice) => dice === state.currentDiceGuess || dice === 1
			).length;

			if (diceCount >= state.currentCountGuess) {
				// guesser was right
				player.diceLeft -= 1;
				room.nextRound(guesser?.id ?? '');
			} else {
				// player was right
				if (guesser !== undefined) {
					guesser.diceLeft -= 1;
				}
				room.nextRound(player.id);
			}
		}, 10000);
	}
};
