import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../common/base.controller';
import { IControllerRoute } from '../../common/route.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import 'reflect-metadata';
import { IGroupController } from './group.controller.interface';
import { IGroupService } from '../service/group.service.interface';
import { GroupCreateDto } from '../dto/group-create-dto';
import { StudentCreateDto } from '../dto/student-create-dto';

@injectable()
export class GroupController extends BaseController implements IGroupController {
	constructor(
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.GroupService) private groupService: IGroupService,
	) {
		super(logger);

		const routes: IControllerRoute[] = [
			{
				path: '/createGroup',
				func: this.createGroup,
				method: 'post',
			},
			{
				path: '/createStudent',
				func: this.createStudent,
				method: 'post',
			},
		];
		this.groupService = groupService;
		this.bindRoutes(routes);
	}

	async createGroup(
		{ body }: Request<{}, {}, GroupCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.groupService.createGroup(body);
		this.ok(res, { result: result });
	}

	async createStudent(
		{ body }: Request<{}, {}, StudentCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.groupService.createStudent(body);
		this.ok(res, { result: result });
	}
}
