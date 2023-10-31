<script lang="ts">
	import { state } from '$lib/stores/gameStore';
	import { scale } from 'svelte/transition';
	import { getPlayerAvatar } from '$lib/utils/getPlayerImage';

	$: allDice = [...$state.players.values()].flatMap((player) => [...player.dice]);
	$: diceCount = allDice.filter((dice) => dice === $state.currentDiceGuess || dice === 1).length;
	$: loserId = diceCount >= $state.currentCountGuess ? $state.liarCalledBy : $state.guessedBy;
	$: loser = $state.players.get(loserId);
</script>

<div
	class="absolute left-1/2 top-[28%] mx-auto flex h-[32%] w-[35%] -translate-x-1/2 flex-col items-center gap-[2%] rounded-[1em] border-[0.75em] border-[#152d35] bg-[#345b63] p-[2%]"
	transition:scale="{{ start: 0.5, duration: 250 }}"
>
	<div style="width: 2em; height: 2em;">
		{@html getPlayerAvatar(loser?.name ?? '')}
	</div>
	<span>{loser?.name} was wrong and loses a dice</span>
</div>
