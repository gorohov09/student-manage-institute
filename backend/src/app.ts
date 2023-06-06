import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IUserController } from './users/controller/users.controller.interface';
import { UserController } from './users/controller/users.controller';
import * as mongoose from 'mongoose';
import { GroupController } from './groups/controller/group.controller';
import cors from 'cors';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	urlDatabase: string;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.GroupController) private groupController: GroupController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
		this.urlDatabase = 'mongodb://127.0.0.1:27017/instituteDb';
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware('sdsd');
		//this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/api/users', this.userController.router);
		this.app.use('/api/groups', this.groupController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	async connectDatabase(): Promise<void> {
		await mongoose.connect(this.urlDatabase);
	}

	public async init(): Promise<void> {
		await this.connectDatabase().catch((err) => this.logger.error(err));
		this.app.use(cors());
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}/api`);
	}
}
