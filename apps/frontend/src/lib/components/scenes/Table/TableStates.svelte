<script lang="ts">
	import { room, state } from '$lib/stores/gameStore';
	import Controls from './Controls.svelte';
	import CurrentGuess from './CurrentGuess.svelte';
	import RevealDice from './RevealDice.svelte';
	import RevealLiar from './RevealLiar.svelte';
</script>

<div class="w-full flex-1">
	{#if $state.tableState === 'rolling-dice'}
		<div class="flex h-full items-center justify-center font-bold text-white">
			<p class="text-4xl">Rolling Dice</p>
		</div>
	{:else if $state.tableState === 'playing'}
		{#if $state.currentTurn === $room.sessionId}
			<Controls />
		{:else}
			<CurrentGuess />
		{/if}
	{:else if ['called-liar', 'revealing-liar'].includes($state.tableState)}
		<RevealDice />
	{/if}
	{#if $state.tableState === 'revealing-liar'}
		<RevealLiar />
	{/if}
</div>
