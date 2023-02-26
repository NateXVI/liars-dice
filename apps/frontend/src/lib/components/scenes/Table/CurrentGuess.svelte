<script lang="ts">
	import Avatar from '$lib/components/global/Avatar.svelte';
	import Dice from '$lib/components/global/Dice.svelte';
	import { state } from '$lib/stores/gameStore';

	$: currentDiceGuess = $state.currentDiceGuess;
	$: currentCountGuess = $state.currentCountGuess;
	$: guessedBy = $state.guessedBy;
	$: currentGuesser = $state.players.get($state.guessedBy);
</script>

<div
	class="mx-auto mt-5 flex min-h-[176px] w-full max-w-xl flex-none flex-wrap items-center justify-center justify-self-start overflow-hidden p-5"
	style="background-image: url('/assets/sign-wide.png'); background-size: 100% 100%;"
>
	{#if guessedBy}
		<div class="font-pixel flex-none text-center text-black">
			<Avatar size="{90}" seed="{currentGuesser?.name ?? ''}" />
			<p>{currentGuesser?.name ?? 'Name'}</p>
		</div>
		<div class="outline-text font-pixel text-center text-2xl text-black">
			<p class="text-2xl">Thinks there's</p>
			<div class="flex items-center justify-center">
				<p class="whitespace-pre text-5xl tracking-tighter">
					{currentCountGuess} X{' '}<span class="sr-only">{currentDiceGuess}</span>
				</p>
				<Dice size="{40}" number="{currentDiceGuess}" />
			</div>
		</div>
	{/if}
</div>

<style>
	.outline-text {
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: #ffffff33;
	}
</style>
