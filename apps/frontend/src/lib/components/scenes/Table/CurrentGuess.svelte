<script lang="ts">
	import { state } from '$lib/stores/gameStore';
	import { getPlayerAvatar } from '$lib/utils/getPlayerImage';
	import { scale } from 'svelte/transition';

	$: currentGuessingPlayer = $state.players.get($state.currentTurn);

	$: avatar = getPlayerAvatar(currentGuessingPlayer?.name ?? '');
</script>

<div
	class="absolute left-1/2 top-[45%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white"
	transition:scale="{{ start: 0.5, duration: 250 }}"
>
	<div class="h-[9em] w-[9em]">
		{#if currentGuessingPlayer}
			{@html avatar}
		{/if}
	</div>
	<div class="flex items-center">
		{#if currentGuessingPlayer}
			<span style="font-size: 4em; text-wrap: balance;" class="text-center"
				><span class="font-bold">{currentGuessingPlayer.name}</span> is guessing</span
			>
		{/if}
	</div>
</div>
