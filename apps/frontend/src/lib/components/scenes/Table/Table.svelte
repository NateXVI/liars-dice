<script lang="ts">
	import { onMount } from 'svelte';
	import SceneContainer from '../SceneContainer.svelte';
	import Players from './Players.svelte';
	import TableStates from './TableStates.svelte';
	import PlayerDice from './PlayerDice.svelte';
	import LiarButton from './LiarButton.svelte';
	import { playSound } from '$lib/stores/sounds';
	import { state, room } from '$lib/stores/gameStore';

	let fontSize = 16;
	let container: HTMLDivElement;
	let previousTableState: string = '';

	function calculateFontSize() {
		const { width } = container.getBoundingClientRect();
		fontSize = width / 100;
	}

	$: {
		if ($state.tableState === 'called-liar' && previousTableState !== 'called-liar') {
			playSound('liar');
		}
		previousTableState = $state.tableState;
	}

	$: {
		if ($state.tableState === 'playing' && $state.currentTurn !== $room.sessionId) {
			playSound('nextTurn');
		}
	}

	onMount(() => {
		playSound('start');
		calculateFontSize();
		const fontSizeInterval = setInterval(calculateFontSize, 500);

		return () => {
			clearInterval(fontSizeInterval);
		};
	});
</script>

<svelte:window on:resize="{calculateFontSize}" />
<SceneContainer class="flex items-center justify-center overflow-hidden p-10">
	<div
		class="relative aspect-[10/7] w-full max-w-[1200px] flex-1"
		style="max-width: calc(100vh * (10/7) - 80px); font-size: {fontSize}px;"
		bind:this="{container}"
	>
		<img
			src="/assets/table.svg"
			alt="oval table"
			class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full w-full select-none"
		/>
		<TableStates />
		<Players />
		<PlayerDice />
		<LiarButton />
	</div>
</SceneContainer>
