import { Schema, type } from '@colyseus/schema';

export class Player extends Schema {
	@type('string') id: string;
	@type('string') name: string;
	@type('number') diceLeft: number = 5;
	@type({ array: 'number' }) dice: number[] = [];
	@type('number') order: number;

	constructor({ id, name, order }: { id: string; name: string; order: number }) {
		super();
		this.id = id;
		this.name = name;
		this.order = order;
	}

	rollDice() {
		this.dice = [];
		for (let i = 0; i < this.diceLeft; i++) {
			this.dice.push(Math.floor(Math.random() * 6) + 1);
		}
	}
}
