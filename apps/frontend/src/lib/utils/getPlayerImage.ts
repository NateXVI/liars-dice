import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';

type AvatarOptions = {
	withBackground?: boolean;
	expression?: 'worried';
};
export function getPlayerAvatar(
	name: string,
	{ withBackground = true, expression }: AvatarOptions = {}
) {
	const options: Record<string, any> = {
		seed: name,
		radius: 50,
		backgroundType: withBackground ? ['gradientLinear'] : undefined,
		backgroundRotation: [
			0, 360, 350, 340, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200, 190,
			180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 40, 30, 50, 20, 10
		],
		backgroundColor: withBackground ? ['ffdfbf', 'ffd5dc', 'd1d4f9', 'c0aede', 'b6e3f4'] : undefined
	};
	switch (expression) {
		case 'worried':
			options.eyebrows = ['variant03'];
			options.mouth = ['variant14'];
			break;
	}
	const avatar = createAvatar(adventurer, options);
	return avatar.toString();
}
