<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fade, scale, crossfade } from 'svelte/transition';
	import { room, state, inRoom } from '$lib/stores/gameStore';
	import TitleScreen from '../TitleScreen.svelte';
	import Table from './Table.svelte';
	import WaitingRoom from './WaitingRoom.svelte';

	const duration = 100;
</script>

{#if !$room || !$state || !$inRoom}
	<div in:fade="{{ duration, delay: duration }}" out:fade="{{ duration }}" class="page">
		<TitleScreen />
	</div>
{:else if !$state.isGameStarted}
	<div in:fade="{{ duration, delay: duration }}" out:fade="{{ duration }}" class="page">
		<WaitingRoom />
	</div>
{:else}
	<div in:fade="{{ duration, delay: duration }}" out:fade="{{ duration }}" class="page">
		<Table />
	</div>
{/if}
