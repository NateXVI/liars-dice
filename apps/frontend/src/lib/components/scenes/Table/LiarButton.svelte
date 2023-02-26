<script lang="ts">
	import { sendCommand, state, room } from '$lib/stores/gameStore';

	let selectedCount: number = 1;
	$: selectedCountMin =
		$state.currentDiceGuess === 6 ? $state.currentCountGuess + 1 : $state.currentCountGuess;
	$: selectedCount = Math.max(1, selectedCountMin, selectedCount);
</script>

<button
	disabled="{$state.guessedBy === $room.sessionId ||
		$state.guessedBy === undefined ||
		$state.currentCountGuess === 0}"
	on:click="{() => sendCommand('takeTurn', { action: 'liar' })}"
	class="btn btn-primary btn-xl mt-5 h-auto w-full max-w-lg pb-3 pt-2 text-6xl transition-colors"
	>LIAR!!!</button
>
