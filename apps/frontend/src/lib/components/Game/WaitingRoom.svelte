<script lang="ts">
	import { fade } from 'svelte/transition';
	import { room, sendCommand, state } from '$lib/stores/gameStore';
	import classNames from '$lib/utils/classNames';
	import { Icon, Star } from 'svelte-hero-icons';
	import Avatar from './Avatar.svelte';

	$: players = [...$state.players];
</script>

<div class="py-16 px-5">
	<div class="flex justify-between items-center">
		<p class="text-3xl text-secondary-content">
			Room code <span class="text-4xl font-bold text-primary">{$room.id}</span>
		</p>
		<button class="btn btn-error btn-sm" on:click="{() => $room.leave()}">Leave</button>
	</div>
	<div class="mt-4">
		<p>Players ({players.length}/6)</p>
		<ul class="grid grid-cols-2 gap-y-4">
			{#each players as [id, player]}
				<li class="flex items-center gap-2" transition:fade>
					<Avatar seed="{player.name}" />
					<p
						class="{classNames(
							id === $room.sessionId && 'font-bold',
							'text-2xl text-white tracking-wide'
						)}"
					>
						{player.name}
					</p>
					{#if id === $state.hostId}
						<Icon src="{Star}" solid size="15" class="text-yellow-400" />
					{/if}
				</li>
			{/each}
		</ul>
		{#if $room.sessionId === $state.hostId}
			<div class="mt-5 ">
				<button
					on:click="{() => sendCommand('startGame')}"
					disabled="{players.length <= 1}"
					class="btn btn-wide btn-primary transition-colors">Start game</button
				>
				{#if players.length <= 1}
					<p class="">You need at least 2 players to start the game</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
