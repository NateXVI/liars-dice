<script lang="ts">
	import { state, room } from '$lib/stores/gameStore';
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import RevealDie from './RevealDie.svelte';

	let count = 0;

	$: players = getPlayersInRelativeOrder($state.players, $room.sessionId);
	$: dice = players
		.flatMap((player) => player.dice.map((v) => ({ playerId: player.id, value: v })))
		.filter((d) => d.value === $state.currentDiceGuess || d.value === 1)
		.map((d, i) => ({
			...d,
			id: i
		}));
	$: rotate = dice.reduce((acc, d) => acc + d.value, 0) ** 3 * 9;

	$: {
		if ($state.revealedDice > 0) {
			const current = $state.revealedDice;
			setTimeout(() => {
				count = current;
			}, 1250);
		} else {
			count = 0;
		}
	}
</script>

<div
	class="absolute left-1/2 top-[43%] grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center"
>
	<span
		class="font-modak -mt-36 text-center text-[35em] text-white transition-all"
		class:opacity-0="{count < 1}"
		class:opacity-40="{count > 0}">{count}</span
	>
	{#each dice as dice, index (index)}
		<RevealDie
			show="{$state.revealedDice > index}"
			number="{dice.value}"
			playerId="{dice.playerId}"
			{rotate}
			{index}
		/>
	{/each}
</div>
