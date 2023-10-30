export default function useReel(delays: number[], func: (delay: number) => void) {
	for (const delay of delays) {
		setTimeout(func, delay, delay);
	}
}
