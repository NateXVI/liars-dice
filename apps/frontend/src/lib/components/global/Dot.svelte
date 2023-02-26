<script lang="ts">
	export let row = 1;
	export let col = 1;

	$: style = `grid-row: ${row}; grid-column: ${col};`;
</script>

<div class="h-[65%] w-[65%] flex-none bg-black" style="{style}"></div>
