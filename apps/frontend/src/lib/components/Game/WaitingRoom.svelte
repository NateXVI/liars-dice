<script lang="ts">
	import { room, sendCommand, state } from '$lib/stores/gameStore';
	import classNames from '$lib/utils/classNames';
	import { Icon, Star } from 'svelte-hero-icons';

	$: players = [...$state.players];

	const startGame = () => {
		$room.send('startGame');
	};
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
		<ul>
			{#each players as [id, player]}
				<li class="flex items-center gap-2">
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
					on:click="{() => sendCommand('startGame', {})}"
					disabled="{players.length <= 1}"
					class="btn btn-wide btn-primary">Start game</button
				>
				{#if players.length <= 1}
					<p class="">You need at least 2 players to start the game</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
