<script lang="ts">
	import { fade } from 'svelte/transition';
	import { room, sendCommand, state } from '$lib/stores/gameStore';
	import classNames from '$lib/utils/classNames';
	import { Icon, Star } from 'svelte-hero-icons';
	import Avatar from '$lib/components/global/Avatar.svelte';
	import SceneContainer from '../SceneContainer.svelte';

	$: players = [...$state.players];
</script>

<SceneContainer class="py-16 px-5">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex items-center justify-between">
			<p class="text-secondary-content text-3xl">
				Room code <span class="text-primary text-4xl font-bold">{$room.id}</span>
			</p>
			<button class="btn btn-error btn-sm" on:click="{() => $room.leave()}">Leave</button>
		</div>
		<div class="mt-4">
			<p>Players ({players.length}/6)</p>
			<ul class="grid grid-flow-row gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each players as [id, player]}
					<li class="flex items-center gap-2" transition:fade|local>
						<div class="flex-none">
							<Avatar lookAround seed="{player.name}" />
						</div>
						<p
							class="{classNames(
								id === $room.sessionId && 'font-bold',
								'text-2xl tracking-wide text-white'
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
</SceneContainer>
