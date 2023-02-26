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

<SceneContainer class="grid place-items-center p-5">
	<div class="w-full max-w-5xl">
		<h1 class="text-secondary-content py-16 text-center text-9xl font-extrabold tracking-wider">
			Liars Dice
		</h1>
		<div class="mx-auto grid max-w-lg grid-cols-2 gap-y-4">
			<input
				type="text"
				bind:value="{name}"
				placeholder="NAME"
				max="10"
				class="input input-bordered rounded-badge col-span-2 p-3 text-center text-4xl font-bold  tracking-wider text-white"
			/>
			<input
				type="text"
				bind:value="{code}"
				maxlength="4"
				placeholder="ROOM CODE"
				class="input input-bordered rounded-badge col-span-2 p-3 text-center text-4xl font-bold tracking-wider text-white"
			/>
			<button on:click="{handleCreateRoom}" class="btn btn-secondary rounded-r-none"
				>Create Room</button
			>
			<button on:click="{handleJoinRoom}" class="btn btn-primary rounded-l-none font-bold uppercase"
				>Join Room</button
			>
			<p class="col-span-2 text-center">{message}</p>
		</div>
	</div>
	{#if loading}
		<div
			class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
		>
			<div class="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-700"></div>
		</div>
	{/if}
</SceneContainer>
