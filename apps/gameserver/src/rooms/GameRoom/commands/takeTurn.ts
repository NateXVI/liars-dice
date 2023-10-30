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

		state.revealedDice = 0;
		state.tableState = 'called-liar';
		let totalDice = 0;
		state.players.forEach((player) => {
			player.dice.forEach((dice) => {
				if (dice === state.currentDiceGuess || dice === 1) {
					totalDice += 1;
				}
			});
		});
		let revealTime = totalDice * 1000;

		function easeOutCubic(t: number) {
			return 1 - Math.pow(1 - t, 3);
		}

		room.clock.setTimeout(async () => {
			state.tableState = 'revealing-liar';
			let startTime = Date.now();

			while (state.revealedDice < totalDice) {
				const elapsedTime = Date.now() - startTime;
				if (elapsedTime > revealTime) {
					state.revealedDice = totalDice;
					break;
				}
				const tNormalized = elapsedTime / revealTime;
				state.revealedDice = Math.ceil(totalDice * easeOutCubic(tNormalized));
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}, 1000);

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
		}, revealTime + 1000);
	}
};
