<script lang="ts">
	import { state, inRoom } from '$lib/stores/gameStore';
	import TitleScreen from './scenes/TitleScreen/TitleScreen.svelte';
	import WaitingRoom from './scenes/WaitingRoom/WaitingRoom.svelte';
	import Table from './scenes/Table/Table.svelte';

	$: scene = $state?.scene ?? 'waiting-room';
</script>

{#if !$inRoom}
	<TitleScreen />
{:else if scene === 'waiting-room'}
	<WaitingRoom />
{:else if scene === 'game-table'}
	<Table />
{:else}
	<div class="scene grid place-items-center">
		<p class="text-center">
			That's awkward... you were never supposed to see this page.
			<br />
			Refresh the page and try again.
			<!-- TODO: Link to github to file an issue -->
		</p>
	</div>
{/if}
