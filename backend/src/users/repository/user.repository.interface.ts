import { User } from '../user.entity';

export interface IUserRepository {
	create: (user: User) => Promise<boolean>;
	getByEmail: (email: string) => Promise<any>;
}
