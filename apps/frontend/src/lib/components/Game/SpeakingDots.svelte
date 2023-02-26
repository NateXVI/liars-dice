<script>
	let count = 0;

	const increment = () => {
		count += 1;
		count = count % 4;
	};

	setInterval(increment, 300);

	$: dots = '.'.repeat(count);
</script>

<span class="text-2xl tracking-widest">
	{dots}
</span>
