import type { GameState, Player } from 'gameserver';

export function getPlayersInOrder(players: GameState['players']) {
	const playerList = [...players].map(([, player]) => player).sort((a, b) => a.order - b.order);
	return playerList;
}

export function getPlayersInRelativeOrder(players: GameState['players'], playerId: string) {
	const orderedPlayers = getPlayersInOrder(players);
	const player = players.get(playerId);
	if (!player) return orderedPlayers;

	const greaterThan = orderedPlayers.filter((p) => p.order > player.order);
	const lessThan = orderedPlayers.filter((p) => p.order < player.order);
	const relativeOrderedList = [player, ...greaterThan, ...lessThan] as Player[];
	return relativeOrderedList;
}
