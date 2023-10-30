import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';

type AvatarOptions = {
	seed: string;
	radius: number;
	backgroundType: string[];
	backgroundRotation: number[];
	backgroundColor: string[];
};
export function getPlayerAvatar(name: string) {
	const avatar = createAvatar(adventurer, {
		seed: name,
		radius: 50,
		backgroundType: ['gradientLinear'],
		backgroundRotation: [
			0, 360, 350, 340, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200, 190,
			180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 40, 30, 50, 20, 10
		],
		backgroundColor: ['ffdfbf', 'ffd5dc', 'd1d4f9', 'c0aede', 'b6e3f4']
	});
	return avatar.toString();
}
