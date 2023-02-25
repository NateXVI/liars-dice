<script lang="ts">
	import { state } from '$lib/stores/gameStore';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	$: text = `I think the table has ${$state.currentCountGuess} of ${$state.currentDiceGuess}`;
	let progress = tweened(0, { duration: 3000 });
	$: cutText = text.slice(0, Math.floor($progress * text.length));

	onMount(() => {
		progress.set(1);
	});
</script>

<p>
	{cutText}
</p>
