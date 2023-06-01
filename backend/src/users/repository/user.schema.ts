import { Schema, model } from 'mongoose';

interface UserShema {
	name: string;
	email: string;
	password: string;
	isTeacher: boolean;
}

const schema = new Schema<UserShema>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isTeacher: { type: Boolean, required: true },
});

const UserModel = model<UserShema>('User', schema);

export { UserModel };
