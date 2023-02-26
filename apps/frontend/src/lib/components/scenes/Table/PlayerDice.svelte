<script lang="ts">
	import Dice from '$lib/components/global/Dice.svelte';
	import { state, room } from '$lib/stores/gameStore';
	import classNames from '$lib/utils/classNames';

	let offset = 0;
	const randomizeOffset = () => {
		offset = Math.floor(Math.random() * 12);
		if (isRollingDice) {
			setTimeout(randomizeOffset, 100);
		}
	};

	$: player = $state.players.get($room.sessionId);
	$: isRollingDice = $state.tableState === 'rolling-dice';
	$: isRollingDice === true && randomizeOffset();
</script>

<div class="relative flex w-full flex-wrap items-center justify-between gap-5 md:justify-start">
	{#if player}
		{#each player.dice as die}
			<div class="{classNames(isRollingDice && 'rotate')}">
				<Dice size="{50}" number="{isRollingDice ? ((die + offset) % 5) + 1 : die}" />
			</div>
		{/each}
	{/if}
</div>

<style>
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.rotate {
		animation: rotate 1s linear infinite;
	}
</style>
