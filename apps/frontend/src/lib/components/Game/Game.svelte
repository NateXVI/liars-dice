<script lang="ts">
	import { room, state } from '$lib/stores/gameStore';
	import TitleScreen from '../TitleScreen.svelte';
	import WaitingRoom from './WaitingRoom.svelte';
</script>

{#if !$room}
	<TitleScreen />
{:else if !$state.isGameStarted}
	<WaitingRoom />
{:else}
	<p>Game is started</p>
{/if}
