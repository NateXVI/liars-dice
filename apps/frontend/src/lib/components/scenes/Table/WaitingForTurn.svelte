<script lang="ts">
	import { state } from '$lib/stores/gameStore';

	$: currentTurn = $state.players.get($state.currentTurn);
</script>

{#if currentTurn}
	<div class="mx-auto grid h-full w-full max-w-4xl place-items-center">
		<p class="text-center text-2xl font-bold text-white">
			{currentTurn.name} is guessing
		</p>
	</div>
{/if}
