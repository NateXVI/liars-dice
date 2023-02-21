<script lang="ts">
	import Dot from './Dot.svelte';

	export let number: number;
	$: number = Math.max(1, Math.min(6, number));
</script>

<div class="bg-white w-12 h-12 place-items-center grid grid-rows-3 grid-cols-3 p-2 rounded-md">
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
