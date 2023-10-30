<script lang="ts">
	import Dice from '$lib/components/global/Dice.svelte';
	import { state, room } from '$lib/stores/gameStore';

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

{#if player}
	{#each player.dice as die, index}
		<div
			class="absolute bottom-[30%] left-1/2 h-[6%] w-[6%]"
			style="transform: translateX(calc({index * 140}% - {(player.diceLeft / 2) *
				140}% + {player.diceLeft > 1 ? 20 : 0}%));"
		>
			<div class="h-full w-full" class:rotate="{isRollingDice}">
				<Dice number="{isRollingDice ? ((die + offset) % 5) + 1 : die}" />
			</div>
		</div>
	{/each}
{/if}

<style>
	@keyframes rotate {
		to {
			rotate: 360deg;
		}
	}
	.rotate {
		animation: rotate 1s linear infinite;
	}
</style>
