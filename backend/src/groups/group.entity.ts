import { Student } from './student.entity';

export class Group {
	private readonly _creation: Date;
	private readonly students: Student[];

	constructor(private readonly _number: number, private readonly _specialization: string) {
		this._creation = new Date();
	}

	get number(): number {
		return this._number;
	}

	get specialization(): string {
		return this._specialization;
	}

	get Creation(): Date {
		return this._creation;
	}
}
