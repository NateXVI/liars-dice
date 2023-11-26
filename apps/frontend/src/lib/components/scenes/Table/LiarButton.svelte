<script lang="ts">
	import { sendCommand, state, room } from '$lib/stores/gameStore';

	let selectedCount: number = 1;
	$: selectedCountMin =
		$state.currentDiceGuess === 6 ? $state.currentCountGuess + 1 : $state.currentCountGuess;
	$: selectedCount = Math.max(1, selectedCountMin, selectedCount);
	$: player = $state.players.get($room.sessionId);

	$: playerIsOut = player?.diceLeft === 0;
</script>

<button
	disabled="{$state.tableState !== 'playing' ||
		$state.guessedBy === $room.sessionId ||
		$state.guessedBy === undefined ||
		$state.currentCountGuess === 0 ||
		playerIsOut}"
	on:click="{() => sendCommand('takeTurn', { action: 'liar' })}"
	class="absolute bottom-[17%] left-1/2 -translate-x-1/2 rounded-[0.2em] bg-[#aa2410] px-[10%] font-bold tracking-wider text-white disabled:opacity-40"
	style="font-size: 4em;">Liar!</button
>
