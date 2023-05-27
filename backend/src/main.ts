import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/controller/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserController } from './users/controller/users.controller.interface';
import { IUserService } from './users/service/users.service.interface';
import { UserService } from './users/service/users.service';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { IUserRepository } from './users/repository/user.repository.interface';
import { UserRepository } from './users/repository/user.repository';
import { IGroupRepository } from './groups/repository/group.repository.interface';
import { GroupRepository } from './groups/repository/group.repository';
import { IGroupService } from './groups/service/group.service.interface';
import { GroupService } from './groups/service/group.service';
import { IGroupController } from './groups/controller/group.controller.interface';
import { GroupController } from './groups/controller/group.controller';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IGroupController>(TYPES.GroupController).to(GroupController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
	bind<IGroupRepository>(TYPES.GroupRepository).to(GroupRepository);
	bind<IGroupService>(TYPES.GroupService).to(GroupService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
