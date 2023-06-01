import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../user.entity';

export class LoginResult {
	success: boolean;
	isTeacher: boolean;
}

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	loginUser: (dto: UserLoginDto) => Promise<LoginResult>;
}
