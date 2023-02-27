<script lang="ts">
	import Avatar from '$lib/components/global/Avatar.svelte';
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import { room, state } from '$lib/stores/gameStore';
	import SpeakingDots from '$lib/components/global/SpeakingDots.svelte';
	import SpeechBubble from './SpeechBubble.svelte';

	$: players = getPlayersInRelativeOrder($state.players, $room.sessionId);
	$: currentTurn = $state.players.get($state.currentTurn);
</script>

<div class="w-full">
	<div class="mx-auto max-w-5xl">
		{#if $state.tableState === 'playing' && currentTurn && currentTurn.id !== $room.sessionId}
			<div class="h-16"></div>
		{/if}
		<ul class="flex justify-evenly">
			{#each players as player}
				<li class="relative flex-none">
					<div class="relative">
						{#if $state.tableState === 'playing' && currentTurn && currentTurn.id !== $room.sessionId && player.id === currentTurn.id}
							<SpeechBubble />
						{/if}
						<Avatar seed="{player.name}" lookAround />
					</div>
					<p
						class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-medium text-white"
					>
						{player.name}
					</p>
				</li>
			{/each}
		</ul>
		<div class="h-[25px] w-full bg-[#4f2d21] bg-contain"></div>
	</div>
</div>
