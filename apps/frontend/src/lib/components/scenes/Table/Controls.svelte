<script lang="ts">
	import { sendCommand, state } from '$lib/stores/gameStore';
	import Dice from '$lib/components/global/Dice.svelte';

	let selectedCount: number = 1;
	$: selectedCountMin =
		$state.currentDiceGuess === 6 ? $state.currentCountGuess + 1 : $state.currentCountGuess;
	$: selectedCount = Math.max(1, selectedCountMin, selectedCount);

	const diceGuesses = [1, 2, 3, 4, 5, 6];

	$: currentGuesser = $state.players.get($state.guessedBy);
</script>

<div class="bg-base-200 mx-auto grid h-full w-full max-w-4xl place-items-center p-5">
	<div class="space-y-4 text-center text-2xl font-medium">
		<p>You think the table has</p>
		<div class="mx-auto flex items-center justify-center gap-5 text-4xl font-extrabold text-white ">
			<button on:click="{() => (selectedCount -= 1)}" class="counter-button">–</button>
			<p class="w-48 text-center text-9xl font-extrabold">{selectedCount}</p>
			<button on:click="{() => (selectedCount += 1)}" class="counter-button">+</button>
		</div>
		<p>of</p>
		<div class="flex items-center justify-center gap-2">
			{#each diceGuesses as guess}
				<button
					class="transition-all disabled:brightness-50"
					on:click="{() =>
						sendCommand('takeTurn', {
							action: 'raise',
							count: selectedCount,
							dice: guess
						})}"
					disabled="{selectedCount <= $state.currentCountGuess && guess <= $state.currentDiceGuess}"
				>
					<Dice number="{guess}" />
				</button>
			{/each}
		</div>
		{#if currentGuesser}
			<p>Or you think that {currentGuesser.name} is lying</p>
		{/if}
	</div>
</div>
