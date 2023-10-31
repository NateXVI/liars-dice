<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { quadIn, quadOut } from 'svelte/easing';
	import classNames from '$lib/utils/classNames';

	let clazz: string = '';
	export { clazz as class };
	let height = 100;
	const inDuration = 400;
	const outDuration = 300;
</script>

<div
	class="{classNames('fixed bottom-0 left-0 right-0 top-0 h-screen w-screen overflow-auto', clazz)}"
	in:scale="{{ start: 0.5, duration: inDuration, delay: 150, easing: quadOut }}"
	out:fly="{{ y: height, duration: outDuration, easing: quadIn }}"
>
	<slot />
</div>
