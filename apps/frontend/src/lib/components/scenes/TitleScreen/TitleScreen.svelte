<script lang="ts">
	import { browser } from '$app/environment';
	import { createRoom, joinRoom } from '$lib/stores/gameStore';
	import SceneContainer from '../SceneContainer.svelte';

	let code = '';
	$: code = code.replace(/[^a-z]/gi, '').toUpperCase();

	// TODO: switch to local storage
	let name = browser ? sessionStorage.getItem('name') || '' : '';
	$: browser && sessionStorage.setItem('name', name);

	let loading = false;
	let message = '';

	const handleCreateRoom = async () => {
		loading = true;
		message = '';
		try {
			createRoom({ name });
		} catch {
			message = 'Failed to create room';
		}
		loading = false;
	};

	const handleJoinRoom = async () => {
		loading = true;
		message = '';
		try {
			joinRoom(code, { name });
		} catch {
			message = 'Failed to join room';
		}
		loading = false;
	};
</script>

<SceneContainer class="p-5 grid place-items-center">
	<div class="max-w-5xl w-full">
		<h1 class="text-9xl text-center font-extrabold tracking-wider py-16 text-secondary-content">
			Liars Dice
		</h1>
		<div class="grid grid-cols-2 gap-y-4 mx-auto max-w-lg">
			<input
				type="text"
				bind:value="{name}"
				placeholder="NAME"
				max="10"
				class="input input-bordered text-center text-4xl font-bold text-white rounded-badge p-3  col-span-2 tracking-wider"
			/>
			<input
				type="text"
				bind:value="{code}"
				maxlength="4"
				placeholder="ROOM CODE"
				class="input input-bordered text-center text-4xl font-bold text-white rounded-badge p-3 col-span-2 tracking-wider"
			/>
			<button on:click="{handleCreateRoom}" class="btn btn-secondary rounded-r-none"
				>Create Room</button
			>
			<button on:click="{handleJoinRoom}" class="btn btn-primary uppercase font-bold rounded-l-none"
				>Join Room</button
			>
			<p class="text-center col-span-2">{message}</p>
		</div>
	</div>
	{#if loading}
		<div
			class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
		>
			<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
		</div>
	{/if}
</SceneContainer>
