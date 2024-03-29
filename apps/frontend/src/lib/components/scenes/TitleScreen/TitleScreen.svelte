<script lang="ts">
	import { browser } from '$app/environment';
	import { createRoom, joinRoom } from '$lib/stores/gameStore';
	import SceneContainer from '../SceneContainer.svelte';
	import { dev } from '$app/environment';
	import { fade } from 'svelte/transition';

	let code = '';
	$: code = code.replace(/[^a-z]/gi, '').toUpperCase();

	let storage = browser ? (dev ? sessionStorage : localStorage) : null;

	let name = storage ? storage.getItem('name') || '' : '';
	$: storage && storage.setItem('name', name);

	let loading = false;
	let message = '';

	const handleCreateRoom = async () => {
		loading = true;
		message = '';

		if (!name.trim()) {
			message = 'Please enter a name';
			loading = false;
			return;
		}

		try {
			await createRoom({ name });
			message = '';
		} catch {
			message = 'Failed to create room';
		}
		loading = false;
	};

	const handleJoinRoom = async () => {
		const codeRegex = /^[a-z]{4}$/i;
		const validCode = codeRegex.test(code);
		if (!validCode) {
			message = 'Invalid room code';
			return;
		}
		loading = true;
		message = '';
		try {
			await joinRoom(code, { name });
			message = '';
		} catch (e) {
			const code = (e as any)?.code;
			if (typeof code === 'number') {
				switch (code) {
					case 4212:
						message = 'Room not found or is full';
						break;
					default:
						message = 'Failed to join room';
						break;
				}
			} else {
				message = 'Failed to join room';
			}
		}
		loading = false;
	};
</script>

<SceneContainer class="grid place-items-center p-5">
	<div class="w-full max-w-5xl">
		<h1
			class="font-modak py-16 text-center text-6xl tracking-wider text-[#152d35] sm:text-8xl lg:text-9xl"
		>
			Liars Dice
		</h1>
		<div class="mx-auto flex max-w-lg flex-col items-center gap-y-4">
			<input
				type="text"
				bind:value="{name}"
				placeholder="NAME"
				max="10"
				class="input bg-neutral col-span-2 w-full rounded-lg p-3 text-center text-4xl font-bold tracking-wider text-white"
			/>
			<input
				type="text"
				pattern="[a-z]{4}"
				bind:value="{code}"
				maxlength="4"
				placeholder="ROOM CODE"
				class="input bg-neutral col-span-2 w-full rounded-lg p-3 text-center text-4xl font-bold tracking-wider text-white"
			/>
			<p class="col-span-2 text-center">{message}</p>
			<div class="flex w-full flex-col items-center gap-2 py-2">
				<button
					on:click="{handleJoinRoom}"
					class="bg-primary text-primary-content w-full rounded-lg py-4 text-xl font-bold"
					disabled="{loading}">Join Room</button
				>
				<button
					on:click="{handleCreateRoom}"
					class="bg-secondary text-secondary-content w-60 rounded-lg p-2"
					disabled="{loading}">+ Create Room</button
				>
			</div>
		</div>
	</div>
</SceneContainer>

{#if loading}
	<div
		in:fade="{{ duration: 200 }}"
		class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-colors"
	>
		<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-700"></div>
	</div>
{/if}
