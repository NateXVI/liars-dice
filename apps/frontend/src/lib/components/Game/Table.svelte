<script lang="ts">
	import { state, room } from '$lib/stores/gameStore';
	import classNames from '$lib/utils/classNames';
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import Avatar from './Avatar.svelte';
	import Controls from './Controls.svelte';
	import Dice from './Dice.svelte';

	$: allPlayers = getPlayersInRelativeOrder($state.players, $room.sessionId);
	$: thisPlayer = allPlayers[0];
	$: currentPlayer = $state.players.get($state.currentTurn);
	$: otherPlayers = allPlayers.slice(1);

	let offset = 0;
	const randomizeOffset = () => {
		offset = Math.floor(Math.random() * 12);
		if (isRollingDice) {
			setTimeout(randomizeOffset, 100);
		}
	};

	$: isRollingDice = $state.state === 'rolling-dice';
	$: isRollingDice === true && randomizeOffset();
</script>

<div class="min-h-full flex flex-col justify-between max-w-5xl mx-auto">
	<div>
		<div class="flex w-full justify-around pt-16 px-5">
			{#each otherPlayers as player}
				<div class="aspect-square round-lg w-auto flex items-center flex-col">
					<p class="player-label text-center text-lg text-secondary-content font-bold">
						{player.name}
					</p>
					<Avatar seed="{player.name}" lookAround active="{player.id === $state.currentTurn}" />
				</div>
			{/each}
		</div>
		<div class="h-10 w-full bg-yellow-900"></div>
	</div>
	<div class="flex flex-col flex-1">
		{#if isRollingDice}
			<div class="w-full flex-1 h-full grid place-items-center">
				<p class="text-secondary-content text-5xl font-extrabold">Rolling dice...</p>
			</div>
		{:else}
			<Controls />
		{/if}
	</div>
	<div class="flex items-end">
		<div class="flex flex-col justify-center items-center px-10 overflow-hidden">
			<p class="player-label text-center text-lg text-secondary-content font-bold">
				{thisPlayer.name}
			</p>
			<Avatar seed="{thisPlayer.name}" active="{thisPlayer.id === $state.currentTurn}" />
		</div>
		<div class="py-5 space-y-2">
			<p>Your dice</p>
			<div class="flex justify-center gap-x-6 items-end relative">
				{#each thisPlayer.dice as die}
					<div class="{classNames(isRollingDice && 'blurr-sm rotate')}">
						<Dice number="{isRollingDice ? ((die + offset) % 5) + 1 : die}" />
					</div>
				{/each}
			</div>
		</div>
	</div>
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
