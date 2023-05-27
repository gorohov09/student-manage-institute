export class GroupDto {
	id: string;
	number: number;
	specialization: string;
	creation: Date;
	countStudents: number;

	constructor(
		id: string,
		number: number,
		specialization: string,
		creation: Date,
		countStudents: number,
	) {
		this.id = id;
		this.number = number;
		this.specialization = specialization;
		this.creation = creation;
		this.countStudents = countStudents;
	}
}
