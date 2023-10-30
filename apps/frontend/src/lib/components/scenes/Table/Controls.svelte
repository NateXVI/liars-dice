<script lang="ts">
	import { sendCommand, state } from '$lib/stores/gameStore';
	import Dice from '$lib/components/global/Dice.svelte';
	import { fade, scale } from 'svelte/transition';
	import  { playSound } from '$lib/stores/sounds';
	import { onMount } from 'svelte';

	let selectedCount: number = 1;

	$: selectedCountMin =
		$state.currentDiceGuess === 6 ? $state.currentCountGuess + 1 : $state.currentCountGuess;
	$: selectedCount = Math.min(Math.max(1, selectedCountMin, selectedCount), 36);

	const diceGuesses = [1, 2, 3, 4, 5, 6];

	onMount(() => {
		playSound('startTurn');
	});
</script>

<div
	class="absolute left-1/2 top-[28%] mx-auto flex h-[32%] w-[35%] -translate-x-1/2 flex-col items-center gap-[2%] rounded-[1em] border-[0.75em] border-[#152d35] bg-[#345b63] p-[2%]"
	transition:scale="{{ start: 0.5, duration: 250 }}"
>
	<span style="font-size: 1.5em;" class="text-white">You think the table has</span>
	<div class="flex h-[45%] w-full items-center justify-between text-white">
		<button on:click="{() => (selectedCount -= 1)}" class="counter-button">–</button>
		<span style="font-size: 7em" class="text-center font-extrabold">{selectedCount}</span>
		<button on:click="{() => (selectedCount += 1)}" class="counter-button">+</button>
	</div>
	<span style="font-size: 1.5em" class="text-white">of</span>
	<div class="flex w-full flex-1 items-center justify-center gap-2 pt-[1em]">
		{#each diceGuesses as guess, index}
			<button
				class="aspect-square w-[12%] transition-all disabled:opacity-50"
				in:fade="{{ delay: index * 50 + 250, duration: 200 }}"
				on:click="{() => {
					playSound('select');
					sendCommand('takeTurn', {
						action: 'raise',
						count: selectedCount,
						dice: guess
					});
				}}"
				disabled="{selectedCount <= $state.currentCountGuess && guess <= $state.currentDiceGuess}"
			>
				<Dice number="{guess}" />
			</button>
		{/each}
	</div>
</div>

<style>
	.counter-button {
		font-size: 4em;
		width: 20%;
		font-weight: bold;
		color: white;
	}
</style>
