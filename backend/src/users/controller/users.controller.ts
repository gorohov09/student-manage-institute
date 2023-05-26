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
		this.ok(res, { result: result });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже сущеуууствует'));
		}

		this.ok(res, { email: result.email });
	}
}
