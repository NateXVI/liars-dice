import { writable } from 'svelte/store';
import { Client, type Room } from 'colyseus.js';
import { browser } from '$app/environment';
import type { GameState } from 'gameserver';
import { get_store_value } from 'svelte/internal';
import type { CommandType, CommandArgs } from 'gameserver';

export const client = browser ? new Client('ws://localhost:2567') : ({} as Client);

type RoomWithState = Room<GameState>;

export const room = writable<RoomWithState>();
export const state = writable<GameState>();
export const inRoom = writable(false);

export const sendCommand = <T extends CommandType>(type: T, message: CommandArgs<T> = {}) => {
	const $room = get_store_value(room);
	if (!$room) {
		console.error('No room to send command to');
		return;
	}
	$room.send(type, message);
};

export const getPlayer = (id?: string) => {
	const $room = get_store_value(room);
	const $state = get_store_value(state);
	if (!$room || !$state) return null;
	const playerId = id || $room.sessionId;
	return $state.players.get(playerId);
};

const addListenersToRoom = (r: RoomWithState) => {
	r.onStateChange((s) => {
		state.set(s);
	});
	r.onMessage('message', (message) => {
		console.log('Message from server:', message);
	});
	r.onLeave(() => {
		inRoom.set(false);
	});
};

type RoomOptions = {
	name?: string;
};

export const createRoom = async (opts: RoomOptions = {}) => {
	const newRoom = await client.create<GameState>('game', opts);
	addListenersToRoom(newRoom);
	state.set(newRoom.state);
	room.set(newRoom);
	inRoom.set(true);
};

export const joinRoom = async (roomId: string, opts: RoomOptions = {}) => {
	const newRoom = await client.joinById<GameState>(roomId, opts);
	addListenersToRoom(newRoom);
	state.set(newRoom.state);
	room.set(newRoom);
	inRoom.set(true);
};
