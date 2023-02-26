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
	class="btn btn-warning md:btn-wide h-[40px] w-full text-xl font-bold">Liar!</button
>
