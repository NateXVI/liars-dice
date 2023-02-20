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

export const sendCommand = <T extends CommandType>(type: T, message: CommandArgs<T>) => {
	const $room = get_store_value(room);
	if (!$room) {
		console.error('No room to send command to');
		return;
	}
	$room.send(type, message);
};

export const getPlayer = (id?: string) => {
	const $state = get_store_value(state);
	const playerId = id || get_store_value(room).sessionId;
	return $state.players.get(playerId);
};

const addListenersToRoom = (r: RoomWithState) => {
	r.onStateChange((s) => {
		state.set(s);
	});
	r.onMessage('message', (message) => {
		console.log('Message from server:', message);
	});
	r.onMessage('error', (message) => {
		console.log('Error from server:', message);
	});
	r.onError((code, message) => {
		console.log('Error from server:', code, message);
	});
	r.onStateChange((s) => {
		state.set(s);
	});
	r.onLeave((code) => {
		console.log('Room left:', code);
		room.set(undefined as unknown as Room); // the room will not be used if it isn't defined, I'll make sure of that
		state.set(undefined as unknown as GameState); // same as above
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
};

export const joinRoom = async (roomId: string, opts: RoomOptions = {}) => {
	const newRoom = await client.joinById<GameState>(roomId, opts);
	addListenersToRoom(newRoom);
	state.set(newRoom.state);
	room.set(newRoom);
};
