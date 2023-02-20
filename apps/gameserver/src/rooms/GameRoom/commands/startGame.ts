import { CommandFunction } from '.';

export const startGame: CommandFunction<{}> = ({ room, state, client }) => {
	const players = [...state.players];

	if (players.length < 2) return;
	if (state.hostId !== client.sessionId) return;
	if (state.isGameStarted) return;

	state.isGameStarted = true;
};
