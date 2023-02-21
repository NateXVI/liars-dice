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
	if (message.action === 'raise') {
		if (client.sessionId !== state.currentTurn) return;
		const { dice, count } = message;
		state.currentDiceGuess = dice;
		state.currentCountGuess = count;
		state.guessedBy = client.sessionId;

		const players = [...state.players]
			.sort((a, b) => a[1].order - b[1].order)
			.filter(([, player]) => player.diceLeft > 0);

		room.nextTurn();
	} else if (message.action === 'liar') {
		if (client.sessionId === state.currentTurn) return;
		const players = [...state.players];

		const dice = [] as number[];
		for (const [, player] of players) {
			dice.push(...player.dice);
		}
		let countedDice = dice.filter((d) => d === state.currentDiceGuess || d === 1).length;

		if (countedDice >= state.currentCountGuess) {
			const player = state.players.get(client.sessionId);
			if (player) {
				player.diceLeft -= 1;
				room.nextRound(state.currentTurn);
			}
			console.log({ player });
		} else {
			const player = state.players.get(state.currentTurn);
			if (player) {
				player.diceLeft -= 1;
				room.nextRound(client.sessionId);
			}
			console.log({ player });
		}
	}
};
