<script lang="ts">
	import Dice from '$lib/components/global/Dice.svelte';
	import { state, room } from '$lib/stores/gameStore';
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	$: players = getPlayersInRelativeOrder($state.players, $room.sessionId);
	$: dice = players
		.flatMap((player) => player.dice.map((v) => ({ player: player.id, value: v })))
		.filter((d) => d.value === $state.currentDiceGuess || d.value === 1)
		.map((d, i) => ({
			...d,
			id: i
		}));
	$: revealedDice = dice.filter((d, i) => i < $state.revealedDice);
	$: unrevealedDice = dice.filter((d, i) => i >= $state.revealedDice);
	$: console.log(`Showing ${$state.revealedDice} of ${dice.length} dice`);
</script>

<div
	class="absolute left-1/2 top-[40%] grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center border border-black"
	style="grid-template-columns: repeat({Math.round(Math.sqrt(revealedDice.length))}, 1fr);"
>
	{#each unrevealedDice as dice (dice.id)}
		<div
			class="absolute top-0 aspect-square w-[5em]"
			animate:flip="{{
				duration: 100,
				easing: quintOut,
				delay: 0
			}}"
		>
			<Dice number="{dice.value}" />
		</div>
	{/each}
	{#each revealedDice as dice (dice.id)}
		<div
			class="aspect-square w-[5em]"
			animate:flip="{{
				duration: 1000,
				easing: quintOut,
				delay: 0
			}}"
		>
			<Dice number="{dice.value}" />
		</div>
	{/each}
</div>
