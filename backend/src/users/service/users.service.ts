import { injectable } from 'inversify';
import { IUserService } from './users.service.interface';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../user.entity';
import { UserLoginDto } from '../dto/user-login.dto';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
	async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		console.log(newUser);
		//проверка что он есть?
		//если есть - возвращаем null
		//если нет - создаем
		return null;
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return true;
	}
}
