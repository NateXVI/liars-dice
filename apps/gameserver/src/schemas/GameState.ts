import { MapSchema, Schema, type } from '@colyseus/schema';
import { Player } from './Player';

const tableStates = [
	'rolling-dice',
	'playing',
	'revealing-answer',
	'called-liar',
	'revealing-liar'
] as const;


export class GameState extends Schema {
	@type({ map: Player }) players = new MapSchema<Player>();
	@type('string') hostId: string;

	@type('string') scene: 'waiting-room' | 'game-table' = 'waiting-room';
	@type('string') tableState: (typeof tableStates)[number] = 'playing';

	@type('string') currentTurn: string;
	@type('number') previousDiceGuess: number = 0;
	@type('number') previousCountGuess: number = 0;
	@type('string') previousGuessedBy: string;
	@type('number') currentDiceGuess: number = 0;
	@type('number') currentCountGuess: number = 0;
	@type('string') guessedBy: string;
}
