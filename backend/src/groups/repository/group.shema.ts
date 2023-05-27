import { Schema, Types, model } from 'mongoose';

interface GroupSchema {
	number: number;
	specialization: string;
	creation: Date;
	students?: Types.ObjectId[];
}

interface StudentSchema {
	lastName: string;
	firstName: string;
	patronymic: string;
	birthday: Date;
}

const groupSchema = new Schema<GroupSchema>({
	number: {
		type: Number,
		required: true,
	},
	specialization: {
		type: String,
		required: true,
	},
	creation: {
		type: Date,
		required: true,
	},
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Student',
		},
	],
});

const studentSchema = new Schema<StudentSchema>({
	lastName: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	patronymic: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
});

const GroupModel = model<GroupSchema>('Group', groupSchema);
const StudentModel = model<StudentSchema>('Student', studentSchema);

export { GroupModel, StudentModel };
