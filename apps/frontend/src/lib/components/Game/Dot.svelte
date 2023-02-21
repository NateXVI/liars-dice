<script lang="ts">
	export let row = 1;
	export let col = 1;

	$: style = `grid-row: ${row}; grid-column: ${col};`;
</script>

<div class="bg-black w-[7px] h-[7px] rounded-full" style="{style}"></div>
