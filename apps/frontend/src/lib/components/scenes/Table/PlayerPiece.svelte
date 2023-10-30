<script lang="ts">
	import Dice from '$lib/components/global/Dice.svelte';
	import { state } from '$lib/stores/gameStore';
	import { getPlayerAvatar } from '$lib/utils/getPlayerImage';
	import type { Player } from 'gameserver';

	export let player: Player;

	$: guessed = $state.guessedBy === player.id;

	$: image = getPlayerAvatar(player.name);
</script>

<div class="relative">
	<img
		src="/assets/player-piece-empty.svg"
		alt="player piece/background/card"
		aria-hidden="true"
		class="pointer-events-none select-none"
		class:hidden="{guessed}"
	/>
	<img
		src="/assets/player-piece.svg"
		alt="player piece/background/card"
		aria-hidden="true"
		class="pointer-events-none select-none"
		class:hidden="{!guessed}"
	/>
	<div
		class="pointer-events-none absolute top-[8%] left-[6%] aspect-square w-[24%] select-none rounded-full bg-white"
	>
		{@html image}
	</div>
	<div
		class="absolute top-[12%] left-[32%] flex h-[15%] w-[57%] items-center justify-center text-center"
	>
		<span style="font-size: 1.25em" class="font-thin text-white">{player.name}</span>
	</div>
	<div
		class="absolute top-[32%] left-[32%] flex h-[15%] w-[57%] items-center justify-center text-center"
	>
		<span style="font-size: 2.25em" class="font-semibold text-white"
			>{player.diceLeft} dice left</span
		>
	</div>
	{#if guessed}
		<div
			class="absolute bottom-[7%] left-[35%] flex h-[25%] w-[50%] items-center justify-center gap-[7%] text-white"
		>
			<span class="font-extrabold" style="font-size: 4em;">{$state.currentCountGuess} x</span>
			<div class="aspect-square w-[23%] pt-[2.5%]">
				<Dice number="{$state.currentDiceGuess}" />
			</div>
		</div>
	{/if}
</div>
