<script lang="ts">
	import { fade } from 'svelte/transition';
	import { room, sendCommand, state } from '$lib/stores/gameStore';
	import classNames from '$lib/utils/classNames';
	import { Icon, Star, Square2Stack } from 'svelte-hero-icons';
	import SceneContainer from '../SceneContainer.svelte';
	import { getPlayerAvatar } from '$lib/utils/getPlayerImage';

	let showCode = false;

	$: players = [...$state.players];
</script>

<SceneContainer class="px-5 py-16">
	<div class="mx-auto w-full max-w-4xl">
		<div class="bg-neutral flex items-center justify-between rounded-lg p-4">
			<div class="flex items-center gap-2">
				<p class="text-secondary-content text-xl">Room code</p>
				<button
					class="group flex h-10 w-28 items-center justify-center rounded-md bg-gray-700"
					on:click="{() => (showCode = !showCode)}"
				>
					{#if showCode}<span class="text-primary-content text-4xl font-bold">{$room.id}</span>{/if}
					{#if !showCode}<span
							class="font-semibold text-gray-300 opacity-0 transition-all group-hover:opacity-100"
							>show</span
						>{/if}
				</button>
				<button on:click="{() => navigator.clipboard.writeText($room.id)}">
					<Icon src="{Square2Stack}" class="h-7 w-7 stroke-2 text-white opacity-60" />
					<span class="sr-only">Copy code</span>
				</button>
			</div>
			<button class="btn btn-error btn-sm" on:click="{() => $room.leave()}">Leave</button>
		</div>
		<div class="bg-base-200 text-base-content mt-4 flex flex-col gap-6 rounded-lg p-4">
			<p>Players ({players.length}/6)</p>
			<ul class="grid grid-flow-row gap-y-4 sm:grid-cols-2">
				{#each players as [id, player]}
					<li class="flex items-center gap-2" transition:fade|local>
						<div class="h-20 w-20 flex-none">
							{@html getPlayerAvatar(player.name, { withBackground: false })}
						</div>
						<p
							class="{classNames(id === $room.sessionId && 'font-bold', 'text-2xl tracking-wide')}"
						>
							{player.name}
						</p>
						{#if id === $state.hostId}
							<Icon src="{Star}" solid size="15" class="text-primary" />
						{/if}
					</li>
				{/each}
			</ul>
			<div class="flex w-full flex-col items-center justify-center gap-4">
				{#if $room.sessionId === $state.hostId}
					<button
						on:click="{() => sendCommand('startGame')}"
						disabled="{players.length <= 1}"
						class="btn btn-wide btn-primary transition-colors">Start game</button
					>
					{#if players.length <= 1}
						<p class="">You need at least 2 players to start the game</p>
					{/if}
				{:else}
					<span class="opacity-50">waiting for host to start the game</span>
				{/if}
			</div>
		</div>
	</div>
</SceneContainer>
