import { inject, injectable } from 'inversify';
import { IUserService } from './users.service.interface';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../user.entity';
import { UserLoginDto } from '../dto/user-login.dto';
import 'reflect-metadata';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';
import { IUserRepository } from '../repository/user.repository.interface';
import { compare } from 'bcryptjs';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password, this.configService.get<number>('SALT'));
		const result = await this.userRepository.create(newUser);
		if (result) {
			return newUser;
		} else {
			return null;
		}
	}

	async loginUser({ email, password }: UserLoginDto): Promise<boolean> {
		const user = await this.userRepository.getByEmail(email);

		if (user) {
			const res = await compare(password, user.password);
			if (res) {
				return true;
			}
		}

		return false;
	}
}
