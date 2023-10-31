<script lang="ts">
	import { room, state } from '$lib/stores/gameStore';
	import Controls from './Controls.svelte';
	import CurrentGuess from './CurrentGuess.svelte';
	import RevealDice from './RevealDice.svelte';
	import RevealLiar from './RevealLiar.svelte';
	import ShowWinner from './ShowWinner.svelte';
</script>

<div class="w-full flex-1">
	{#if $state.tableState === 'playing'}
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
	{#if $state.tableState === 'game-over'}
		<ShowWinner />
	{/if}
</div>
