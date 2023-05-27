export class Student {
	private readonly _creation: Date;
	private readonly students: Student[];

	constructor(
		private readonly _lastName: string,
		private readonly _firstName: string,
		private readonly _patronymic: string,
		private readonly _birthday: Date,
	) {}

	get lastName(): string {
		return this._lastName;
	}

	get firstName(): string {
		return this._firstName;
	}

	get patronymic(): string {
		return this._patronymic;
	}

	get birthday(): Date {
		return this._birthday;
	}
}
