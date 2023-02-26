<script lang="ts">
	import Avatar from '$lib/components/global/Avatar.svelte';
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import { room, state } from '$lib/stores/gameStore';

	$: players = getPlayersInRelativeOrder($state.players, $room.sessionId);
</script>

<div class="w-full">
	<div class="mx-auto max-w-5xl">
		<ul class="flex justify-evenly">
			{#each players as player}
				<li class="relative flex-none">
					<Avatar seed="{player.name}" lookAround />
					<p
						class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-medium text-white"
					>
						{player.name}
					</p>
				</li>
			{/each}
		</ul>
		<div class="h-[25px] w-full bg-[#4f2d21] bg-contain"></div>
	</div>
</div>
