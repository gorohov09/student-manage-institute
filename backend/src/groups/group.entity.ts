import { Student } from './student.entity';

export class Group {
	private _id: string;
	private readonly _creation: Date;
	private _students: Student[];

	constructor(
		private readonly _number: number,
		private readonly _specialization: string,
		creation?: Date,
		id?: string,
	) {
		this._creation = creation == null ? new Date() : creation;
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

	get id(): string {
		return this._id;
	}

	get students(): Student[] {
		return this._students;
	}

	set students(students: Student[]) {
		this._students = students;
	}

	// eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
	set id(id: string) {
		this._id = id;
	}
}
