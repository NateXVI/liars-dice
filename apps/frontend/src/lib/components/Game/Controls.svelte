<script lang="ts">
	import { slide } from 'svelte/transition';
	import { sendCommand, state, room } from '$lib/stores/gameStore';
	import Dice from './Dice.svelte';

	let selectedCount: number = 1;
	$: selectedCountMin =
		$state.currentDiceGuess === 6 ? $state.currentCountGuess + 1 : $state.currentCountGuess;
	$: selectedCount = Math.max(1, selectedCountMin, selectedCount);

	const diceGuesses = [1, 2, 3, 4, 5, 6];

	$: currentGuesser = $state.players.get($state.guessedBy);
	$: currentTurn = $state.players.get($state.currentTurn);
</script>

<div class="grid place-items-center text-center text-2xl flex-1 w-full h-full">
	<div class="w-full">
		{#if currentTurn && currentTurn.id !== $room.sessionId}
			<p class="mb-5 text-2xl text-white">
				<b>{currentTurn.name}</b> is taking their turn
			</p>
		{/if}
		{#if currentGuesser}
			<p class="flex w-full justify-center gap-3 mb-5 items-center text-2xl text-white">
				<b>{currentGuesser.id === $room.sessionId ? 'You' : currentGuesser.name}</b> thinks there
				are
				<b>{$state.currentCountGuess}</b>
				of
				<span><Dice number="{$state.currentDiceGuess}" /></span>
			</p>
		{/if}
		{#if $state.currentTurn === $room.sessionId}
			<div transition:slide class="space-y-5 bg-base-200 w-full py-8">
				<div>
					<p>You think the table has</p>
					<div
						class="text-white justify-center items-center gap-5 flex mx-auto font-extrabold text-4xl "
					>
						<button on:click="{() => (selectedCount -= 1)}" class="counter-button">–</button>
						<p class="font-extrabold text-center text-9xl w-48">{selectedCount}</p>
						<button on:click="{() => (selectedCount += 1)}" class="counter-button">+</button>
					</div>
				</div>
				<p>of</p>
				<div class="flex items-center justify-center gap-2">
					{#each diceGuesses as guess}
						<button
							class="disabled:brightness-50 transition-all"
							on:click="{() =>
								sendCommand('takeTurn', {
									action: 'raise',
									count: selectedCount,
									dice: guess
								})}"
							disabled="{selectedCount <= $state.currentCountGuess &&
								guess <= $state.currentDiceGuess}"
						>
							<Dice number="{guess}" />
						</button>
					{/each}
				</div>
				{#if currentGuesser}
					<p>Or you think that {currentGuesser.name} is lying</p>
				{/if}
			</div>
		{/if}
		<button
			disabled="{$state.guessedBy === $room.sessionId}"
			on:click="{() => sendCommand('takeTurn', { action: 'liar' })}"
			class="btn mt-5 btn-primary btn-xl text-6xl h-auto pb-3 pt-2 w-full max-w-lg transition-colors"
			>LIAR!!!</button
		>
	</div>
</div>

<style>
	.counter-button {
		@apply text-7xl;
	}
	b {
		@apply text-4xl;
	}
</style>
