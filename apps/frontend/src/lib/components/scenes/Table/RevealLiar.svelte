<script lang="ts">
	import { room, state } from '$lib/stores/gameStore';
	import { scale } from 'svelte/transition';
	import { getPlayerAvatar } from '$lib/utils/getPlayerImage';
	import { onMount } from 'svelte';
	import { playSound } from '$lib/stores/sounds';

	$: allDice = [...$state.players.values()].flatMap((player) => [...player.dice]);
	$: diceCount = allDice.filter((dice) => dice === $state.currentDiceGuess || dice === 1).length;
	$: loserId = diceCount >= $state.currentCountGuess ? $state.liarCalledBy : $state.guessedBy;
	$: loser = $state.players.get(loserId);

	onMount(() => {
		if (loser?.id === $room.sessionId) {
			playSound('loseRound');
		} else {
			playSound('winRound');
		}
	});
</script>

<div
	class="absolute left-1/2 top-[28%] mx-auto flex h-[32%] w-[35%] -translate-x-1/2 flex-col items-center justify-center gap-[2%] rounded-[1em] border-[0.75em] border-[#152d35] bg-[#345b63] p-[2%]"
	transition:scale="{{ start: 0.5, duration: 250 }}"
>
	<div style="width: 10em; height: 10em;">
		{@html getPlayerAvatar(loser?.name ?? '', { expression: 'worried' })}
	</div>
	<span class="text-center text-lg text-white"
		><span class="font-bold">{loser?.name}</span> was wrong and loses a dice</span
	>
</div>
