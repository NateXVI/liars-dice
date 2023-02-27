<script lang="ts">
	import SpeakingDots from '$lib/components/global/SpeakingDots.svelte';
	import { room, state } from '$lib/stores/gameStore';
	import Controls from './Controls.svelte';
	import WaitingForTurn from './WaitingForTurn.svelte';
</script>

<div class="w-full flex-1">
	{#if $state.tableState === 'rolling-dice'}
		<div class="flex h-full items-center justify-center font-bold text-white">
			<p class="text-4xl">Rolling Dice<SpeakingDots /></p>
		</div>
	{:else if $state.tableState === 'playing'}
		{#if $state.currentTurn === $room.sessionId}
			<Controls />
		{:else}
			<WaitingForTurn />
		{/if}
	{/if}
</div>
