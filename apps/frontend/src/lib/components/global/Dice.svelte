<script lang="ts">
	export let number: number;
	$: number = Math.max(1, Math.min(6, number));
</script>

<img src="/assets/dice-{number}.svg" alt="dice {number}" class="pointer-events-none select-none" />
