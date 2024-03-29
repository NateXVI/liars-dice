import { writable, get } from 'svelte/store';
import { Client, type Room } from 'colyseus.js';
import { browser } from '$app/environment';
import type { GameState } from 'gameserver';
import type { CommandType, CommandArgs } from 'gameserver';
import { PUBLIC_GAME_SERVER_URL } from '$env/static/public';

export const client = browser ? new Client(PUBLIC_GAME_SERVER_URL) : ({} as Client);

type RoomWithState = Room<GameState>;

export const room = writable<RoomWithState>();
export const state = writable<GameState>();
export const inRoom = writable(false);

export const sendCommand = <T extends CommandType>(type: T, message: CommandArgs<T> = {}) => {
	const $room = get(room);
	if (!$room) {
		console.error('No room to send command to');
		return;
	}
	$room.send(type, message);
};

export const getPlayer = (id?: string) => {
	const $room = get(room);
	const $state = get(state);
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
	r.onError((code, message) => {
		console.log('Error', code, message);
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
