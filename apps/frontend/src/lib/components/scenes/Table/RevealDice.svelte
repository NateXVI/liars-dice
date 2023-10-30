<script lang="ts">
	import { state, room } from '$lib/stores/gameStore';
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import RevealDie from './RevealDie.svelte';
	$: players = getPlayersInRelativeOrder($state.players, $room.sessionId);
	$: dice = players
		.flatMap((player) => player.dice.map((v) => ({ playerId: player.id, value: v })))
		.filter((d) => d.value === $state.currentDiceGuess || d.value === 1)
		.map((d, i) => ({
			...d,
			id: i
		}));
	$: rotate = dice.reduce((acc, d) => acc + d.value, 0) ** 3 * 9;
</script>

<div
	class="absolute left-1/2 top-[43%] grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center"
	style="grid-template-columns: repeat({Math.round(Math.sqrt(dice.length))}, 1fr);"
>
	{#each dice as dice, index (dice.id)}
		<RevealDie
			show="{$state.revealedDice > index}"
			number="{dice.value}"
			playerId="{dice.playerId}"
			{rotate}
			{index}
		/>
	{/each}
</div>
