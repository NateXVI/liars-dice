<script lang="ts">
	import Dot from './Dot.svelte';

	export let size = 48;
	$: style = `width: ${size}px; height: ${size}px; padding: ${size / 8}px;`;
	export let number: number;
	$: number = Math.max(1, Math.min(6, number));
</script>

<div style="{style}" class="box-border grid grid-cols-3 grid-rows-3 place-items-center bg-white">
	{#if number === 1}
		<Dot row="{2}" col="{2}" />
	{:else if number === 2}
		<Dot row="{1}" col="{1}" />
		<Dot row="{3}" col="{3}" />
	{:else if number === 3}
		<Dot row="{1}" col="{1}" />
		<Dot row="{2}" col="{2}" />
		<Dot row="{3}" col="{3}" />
	{:else if number === 4}
		<Dot row="{1}" col="{1}" />
		<Dot row="{1}" col="{3}" />
		<Dot row="{3}" col="{1}" />
		<Dot row="{3}" col="{3}" />
	{:else if number === 5}
		<Dot row="{1}" col="{1}" />
		<Dot row="{1}" col="{3}" />
		<Dot row="{2}" col="{2}" />
		<Dot row="{3}" col="{1}" />
		<Dot row="{3}" col="{3}" />
	{:else if number === 6}
		<Dot row="{1}" col="{1}" />
		<Dot row="{2}" col="{1}" />
		<Dot row="{3}" col="{1}" />
		<Dot row="{1}" col="{3}" />
		<Dot row="{2}" col="{3}" />
		<Dot row="{3}" col="{3}" />
	{/if}
</div>
