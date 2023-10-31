<script lang="ts">
	import Dice from '$lib/components/global/Dice.svelte';
	import { getPlayersInRelativeOrder } from '$lib/utils/getPlayersInOrder';
	import { state, room } from '$lib/stores/gameStore';

	export let number: number;
	export let playerId: string;
	export let show: boolean;
	export let index: number;
	export let rotate: number;

	function getSunflowerPoint(index: number, alpha: number, rotationDegrees = 0) {
		const goldenAngle = 137.508;
		const theta = index * goldenAngle;
		const thetaInRadians = (Math.PI / 180) * theta;
		const r = Math.sqrt(index) * alpha;
		const x = r * Math.cos(thetaInRadians);
		const y = r * Math.sin(thetaInRadians);
		const rotationInRadians = (Math.PI / 180) * rotationDegrees;
		const rotatedX = x * Math.cos(rotationInRadians) - y * Math.sin(rotationInRadians);
		const rotatedY = x * Math.sin(rotationInRadians) + y * Math.cos(rotationInRadians);

		return { x: rotatedX, y: rotatedY };
	}

	function polarToCartesian(angleDegrees: number, distance: number) {
		const angleInRadians = (Math.PI / 180) * angleDegrees;

		const x = distance * Math.cos(angleInRadians);
		const y = distance * Math.sin(angleInRadians);

		return { x, y };
	}

	function addVectors(a: { x: number; y: number }, b: { x: number; y: number }) {
		return { x: a.x + b.x, y: a.y + b.y };
	}

	$: players = getPlayersInRelativeOrder($state.players, $room.sessionId);
	$: playerIndex = players.findIndex((p) => p.id === playerId);

	$: offset = getSunflowerPoint(index + 2, 3.5, rotate);
	$: startVector = [
		[166, 40],
		[190, 35],
		[233, 27],
		[315, 30],
		[351, 40],
		[14, 40]
	][playerIndex];
	$: startOffset = polarToCartesian(startVector[0], startVector[1]);
	$: rotation = index * number * 9;
</script>

<div
	class="absolute aspect-square w-[5em] -translate-x-[50em]"
	class:hidden="{!show}"
	class:show
	style="--translate-x: {offset.x}em; --translate-y: {offset.y}em; --offset-x: {startOffset.x}em; --offset-y: {startOffset.y}em;"
>
	<div style="rotate: {rotation}deg;">
		<Dice {number} />
	</div>
</div>

<style lang="postcss">
	@keyframes reveal {
		from {
			opacity: 0;
			transform: translate(var(--offset-x), var(--offset-y));
		}
		to {
			opacity: 1;
			transform: translate(var(--translate-x), var(--translate-y));
		}
	}

	.show {
		animation: reveal 1.25s ease-in-out forwards;
	}
</style>
