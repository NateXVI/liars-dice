<script lang="ts">
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import { room, state } from '$lib/stores/gameStore';
	import SpeechBubble from './SpeechBubble.svelte';
	import PlayerPiece from '$lib/components/scenes/Table/PlayerPiece.svelte';

	$: players = getPlayersInRelativeOrder($state.players, $room.sessionId);

	$: player1 = players[0];
	$: player2 = players[1];
	$: player3 = players[2];
	$: player4 = players[3];
	$: player5 = players[4];
	$: player6 = players[5];
</script>

<div>
	<!-- Player 1 -->
	{#if player1}
		<div class="absolute -left-[5%] top-[60%] w-[30%] -translate-y-1/2 rounded-full">
			<PlayerPiece player="{player1}" />
		</div>
	{/if}
	<!-- Player 2 -->
	{#if player2}
		<div class="absolute -left-[3%] top-[37%] w-[30%] -translate-y-1/2 rounded-full">
			<PlayerPiece player="{player2}" />
		</div>
	{/if}
	<!-- Player 3 -->
	{#if player3}
		<div class="absolute left-[17%] top-[15%] w-[30%] -translate-y-1/2 rounded-full">
			<PlayerPiece player="{player3}" />
		</div>
	{/if}
	<!-- Player 4 -->
	{#if player4}
		<div class="absolute right-[17%] top-[15%] w-[30%] -translate-y-1/2 rounded-full">
			<PlayerPiece player="{player4}" />
		</div>
	{/if}
	<!-- Player 5 -->
	{#if player5}
		<div class="absolute -right-[3%] top-[37%] w-[30%] -translate-y-1/2 rounded-full">
			<PlayerPiece player="{player5}" />
		</div>
	{/if}
	<!-- Player 6 -->
	{#if player6}
		<div class="absolute -right-[5%] top-[60%] w-[30%] -translate-y-1/2 rounded-full">
			<PlayerPiece player="{player6}" />
		</div>
	{/if}
</div>
