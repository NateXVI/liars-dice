<script>
	import { onDestroy } from 'svelte';

	let count = 0;

	const increment = () => {
		count += 1;
		count = count % 4;
	};

	const interval = setInterval(increment, 300);

	onDestroy(() => {
		clearInterval(interval);
	});

	$: dots = '.'.repeat(count);
</script>

<span>
	{dots}
</span>
