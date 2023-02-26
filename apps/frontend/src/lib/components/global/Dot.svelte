<script lang="ts">
	export let row = 1;
	export let col = 1;

	$: style = `grid-row: ${row}; grid-column: ${col};`;
</script>

<div class="h-[75%] w-[75%] flex-none rounded-full bg-black" style="{style}"></div>
