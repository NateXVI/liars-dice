<script lang="ts">
	import classNames from '$lib/utils/classNames';

	export let seed: string;
	export let active: boolean = false;
	export let lookAround: boolean = false;

	let flipped = Math.random() > 0.5;
	$: shouldFlip = flipped && lookAround;

	const getRandomTime = () => Math.floor(Math.random() * 3000) + 2000;

	const filp = () => {
		flipped = !flipped;
		if (lookAround) setTimeout(filp, getRandomTime());
	};

	$: lookAround && setTimeout(filp, getRandomTime());
</script>

<div class="{classNames('w-20 h-20 relative', active && '')}">
	<div
		class="{classNames(
			'absolute w-full h-full -z-10 transition-all rounded-full',
			active && 'bg-red-800 scale-150'
		)}"
	></div>
	<img
		src="{`https://api.dicebear.com/5.x/pixel-art/svg?seed=${seed}&flip=${shouldFlip}`}"
		alt="player avatar"
		class="w-full h-full flex-none"
	/>
</div>

<style>
</style>
