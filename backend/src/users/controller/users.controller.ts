import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../common/base.controller';
import { IControllerRoute } from '../../common/route.interface';
import { HTTPError } from '../../errors/http-error.class';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import { IUserService } from '../service/users.service.interface';
import 'reflect-metadata';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { sign } from 'jsonwebtoken';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(logger);

		const routes: IControllerRoute[] = [
			{
				path: '/login',
				func: this.login,
				method: 'post',
			},
			{
				path: '/register',
				func: this.register,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				func: this.info,
				method: 'get',
				middlewares: [],
			},
		];

		this.bindRoutes(routes);
		this.userService = userService;
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.loginUser(body);
		if (!result.success) {
			this.ok(res, { status: 401 });
			return;
		}

		const jwt = await this.signJWT(body.email, 'sdsd');
		console.log(jwt);
		console.log(result);

		this.ok(res, {
			result: result.success,
			token: jwt,
			isTeacher: result.isTeacher,
			isAdmin: result.isAdmin,
		});
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		console.log(body);
		const result = await this.userService.createUser(body);
		if (!result) {
			this.ok(res, { status: 401 });
			return;
		}

		this.ok(res, { email: result.email });
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, { email: user });
	}

	private signJWT(email: string, secret: string) {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
