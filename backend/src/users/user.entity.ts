import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		private readonly _isTeacher: boolean = false,
	) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	get isTeacher(): boolean {
		return this._isTeacher;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, Number(salt));
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
