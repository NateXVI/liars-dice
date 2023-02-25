<script lang="ts">
	import { fly } from 'svelte/transition';
	import { elasticOut, quadIn } from 'svelte/easing';
	import classNames from '$lib/utils/classNames';

	let clazz: string = '';
	export { clazz as class };
	let height = 100;
	const inDuration = 1200;
	const outDuration = 300;
</script>

<div
	class="{classNames('fixed top-0 left-0 right-0 bottom-0 h-screen w-screen overflow-auto', clazz)}"
	in:fly="{{ y: height, duration: inDuration, delay: outDuration, easing: elasticOut }}"
	out:fly="{{ y: height, duration: outDuration, easing: quadIn }}"
>
	<slot />
</div>
