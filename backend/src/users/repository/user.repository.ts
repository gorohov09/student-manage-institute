import { injectable } from 'inversify';
import { User } from '../user.entity';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from './user.schema';

@injectable()
export class UserRepository implements IUserRepository {
	async create(user: User): Promise<boolean> {
		const userEntity = new UserModel({
			name: user.name,
			email: user.email,
			password: user.password,
			isTeacher: user.isTeacher,
			isAdmin: false,
		});

		await userEntity.save();
		return true;
	}

	async getByEmail(email: string): Promise<any> {
		const user = await UserModel.where({ email: email }).findOne();
		return user;
	}
}
