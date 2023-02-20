import { Schema, type } from '@colyseus/schema';

export class Player extends Schema {
	@type('string') name: string;
	@type('number') diceLeft: number = 5;
	@type({ array: 'number' }) dice: number[] = [];

	constructor({ name }: { name: string }) {
		super();
		this.name = name;
	}

	rollDice() {
		this.dice = [];
		for (let i = 0; i < this.diceLeft; i++) {
			this.dice.push(Math.floor(Math.random() * 6) + 1);
		}
	}
}
