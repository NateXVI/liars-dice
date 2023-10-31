<script>
	import WinnerGraphic from '$lib/components/assets/WinnerGraphic.svelte';
	import { state } from '$lib/stores/gameStore';
	import { playSound } from '$lib/stores/sounds';
	import { getPlayerAvatar } from '$lib/utils/getPlayerImage';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	$: winner = $state.players.get($state.winnerId);
	$: name = winner?.name ?? 'Unknown player';

	onMount(() => {
		// TODO: play loser sound
		playSound('win');
	});
</script>

<div
	class="absolute left-1/2 top-[43%] z-10 grid h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 place-items-center"
	transition:scale
>
	<div class="h-[90%] w-full">
		<WinnerGraphic>{name} wins</WinnerGraphic>
	</div>
	<div class="absolute top-[20%] aspect-square w-[12em]">
		{@html getPlayerAvatar(name)}
	</div>
</div>
