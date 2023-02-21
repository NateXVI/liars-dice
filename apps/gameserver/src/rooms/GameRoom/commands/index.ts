import { Client } from 'colyseus';
import { GameRoom } from '..';
import { GameState } from '../../../schemas/GameState';

// command imports
import { startGame } from './startGame';
import { takeTurn } from './takeTurn';

export type Args<T> = { room: GameRoom; state: GameState; client: Client; message: T };
export type CommandFunction<T> = (args: Args<T>) => void;

export const commands = {
	startGame,
	takeTurn
} as const;

export type CommandType = keyof typeof commands;
export type CommandArgs<T extends CommandType> = Parameters<(typeof commands)[T]>[0]['message'];
