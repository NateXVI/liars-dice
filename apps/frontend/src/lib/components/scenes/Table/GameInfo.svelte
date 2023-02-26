<script>
	import LiarButton from './LiarButton.svelte';
	import PlayerDice from './PlayerDice.svelte';
</script>

<div
	class="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-5 px-5 pb-5 md:flex-row"
>
	<PlayerDice />
	<LiarButton />
</div>
