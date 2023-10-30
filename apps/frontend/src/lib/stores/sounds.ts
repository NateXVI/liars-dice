import { Howl } from 'howler';

export const sounds = {
	start: new Howl({ src: ['/assets/sounds/start.wav'] }),
	select: new Howl({ src: ['/assets/sounds/select.mp3'] }),
	startTurn: new Howl({ src: ['/assets/sounds/start-turn.wav'] }),
	nextTurn: new Howl({ src: ['/assets/sounds/next-turn.wav'] }),
	liar: new Howl({ src: ['/assets/sounds/liar.mp3'] })
};

export function playSound(sound: keyof typeof sounds) {
	sounds[sound].volume(0.1);
	sounds[sound].play();
}
