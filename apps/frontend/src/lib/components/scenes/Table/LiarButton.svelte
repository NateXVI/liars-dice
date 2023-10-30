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
	class="absolute bottom-[17%] left-1/2 -translate-x-1/2 rounded-[0.2em] bg-[#aa2410] px-[10%] font-bold tracking-wider text-white disabled:opacity-40"
	style="font-size: 4em;">Liar!</button
>
