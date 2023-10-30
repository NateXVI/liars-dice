import { writable } from 'svelte/store';

export default function useKeyframes(frames: Record<string | number | symbol, any>[]) {
	const index = writable(0);
	const frame = writable(frames[0] ?? {});

	const back = () => {
		index.update((n) => {
			frame.set(frames[n - 1] ?? n);
			return n <= 0 ? frames.length - 1 : n - 1;
		});
	};
	const forward = () => {
		index.update((n) => {
			frame.set(frames[n + 1] ?? n);
			return n >= frames.length - 1 ? 0 : n + 1;
		});
	};

	return {
		frame,
		back,
		forward
	};
}
