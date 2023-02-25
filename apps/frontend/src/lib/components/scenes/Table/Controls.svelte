<script lang="ts">
	import { slide, scale } from 'svelte/transition';
	import { state, room } from '$lib/stores/gameStore';
	import GuessInput from '../../Game/GuessInput.svelte';
	import LiarButton from './LiarButton.svelte';
	import CurrentGuess from '../../Game/CurrentGuess.svelte';

	let selectedCount: number = 1;
	$: selectedCountMin =
		$state.currentDiceGuess === 6 ? $state.currentCountGuess + 1 : $state.currentCountGuess;
	$: selectedCount = Math.max(1, selectedCountMin, selectedCount);

	$: currentGuesser = $state.players.get($state.guessedBy);
	$: currentTurn = $state.players.get($state.currentTurn);
</script>

<div transition:slide class="grid place-items-center text-center text-2xl flex-1 w-full h-full">
	<div class="w-full">
		{#if currentTurn && ($state.currentTurn !== $room.sessionId || $state.tableState === 'revealing-answer')}
			<div in:scale="{{ delay: 500 }}">
				<CurrentGuess />
			</div>
		{/if}
		{#if $state.currentTurn === $room.sessionId && $state.tableState !== 'revealing-answer'}
			<div>
				<GuessInput />
			</div>
		{:else}
			<div></div>
		{/if}
		<LiarButton />
	</div>
</div>
