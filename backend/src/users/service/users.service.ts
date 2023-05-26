import { inject, injectable } from 'inversify';
import { IUserService } from './users.service.interface';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../user.entity';
import { UserLoginDto } from '../dto/user-login.dto';
import 'reflect-metadata';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password, this.configService.get<number>('SALT'));
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
