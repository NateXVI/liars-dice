<script lang="ts">
	import classNames from '$lib/utils/classNames';

	export let seed: string;
	export let active: boolean = false;
	export let lookAround: boolean = false;
	export let talking: boolean = false;
	export let flipped: boolean = false;
	export let size = 80;

	let mouthIndex = 0;
	let mouths = ['happy06', 'happy01', 'happy02'];
	$: mouth = talking ? mouths[mouthIndex] ?? null : null;

	let randomFlipped = Math.random() > 0.5;
	$: shouldFlip = flipped !== null ? flipped : randomFlipped && lookAround;

	const getRandomTime = () => Math.floor(Math.random() * 3000) + 2000;

	const cycleMouth = () => {
		mouthIndex = (mouthIndex + 1) % mouths.length;
		if (talking) {
			setTimeout(cycleMouth, 200);
		}
	};

	const filp = () => {
		flipped = !flipped;
		if (lookAround) setTimeout(filp, getRandomTime());
	};

	$: talking && setTimeout(cycleMouth, 200);
	$: lookAround && setTimeout(filp, getRandomTime());
	$: style = `width: ${size}px; height: ${size}px;`;
</script>

<div style="{style}" class="{classNames('relative', active && '')}">
	<div
		class="{classNames(
			'absolute w-full h-full -z-10 transition-all rounded-full',
			active && 'bg-red-800 scale-150'
		)}"
	></div>
	<img
		src="{`https://api.dicebear.com/5.x/pixel-art/svg?seed=${seed}&flip=${shouldFlip}${
			mouth ? `&mouth=${mouth}` : ''
		}`}"
		alt="player avatar"
		class="w-full h-full flex-none"
	/>
</div>

<style>
</style>
