import { Client } from 'colyseus';
import { GameRoom } from '..';
import { GameState } from '../../../schemas/GameState';
import { startGame } from './startGame';

export type Args<T> = { room: GameRoom; state: GameState; client: Client; message: T };
export type CommandFunction<T> = (args: Args<T>) => void;

export const commands = {
	startGame
} as const;

export type CommandType = keyof typeof commands;
export type CommandArgs<T extends CommandType> = Parameters<(typeof commands)[T]>[0]['message'];

// export type CommandRunnder<T extends keyof typeof commands> = (
// 	type: T,
// 	args: Parameters<(typeof commands)[T]>[0]['message']
// ) => void;

// export const commandRunner: CommandRunnder<keyof typeof commands> = (type, args) => {
// 	console.log(type);
// };
