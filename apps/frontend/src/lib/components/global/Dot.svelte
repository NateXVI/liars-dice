<script lang="ts">
	export let row = 1;
	export let col = 1;

	$: style = `grid-row: ${row}; grid-column: ${col};`;
</script>

<div class="bg-black w-[75%] h-[75%] flex-none rounded-full" style="{style}"></div>
