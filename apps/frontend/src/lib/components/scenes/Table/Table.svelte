<script>
	import SceneContainer from '../SceneContainer.svelte';
	import CurrentGuess from './CurrentGuess.svelte';
	import GameInfo from './GameInfo.svelte';
	import Players from './Players.svelte';
	import TableStates from './TableStates.svelte';
</script>

<SceneContainer class="flex min-h-screen flex-shrink-0 flex-col gap-3">
	<CurrentGuess />
	<TableStates />
	<Players />
	<GameInfo />
</SceneContainer>
