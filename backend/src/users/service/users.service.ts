import { inject, injectable } from 'inversify';
import { IUserService, LoginResult } from './users.service.interface';
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

	async createUser({ name, email, password, isTeacher }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name, isTeacher);
		await newUser.setPassword(password, this.configService.get<number>('SALT'));
		const result = await this.userRepository.create(newUser);
		if (result) {
			return newUser;
		} else {
			return null;
		}
	}

	async loginUser({ email, password }: UserLoginDto): Promise<LoginResult> {
		const user = await this.userRepository.getByEmail(email);
		const loginResult = new LoginResult();

		if (user) {
			const res = await compare(password, user.password);
			if (res) {
				loginResult.isTeacher = user.isTeacher;
				loginResult.success = true;
				return loginResult;
			}
		}

		return loginResult;
	}
}
