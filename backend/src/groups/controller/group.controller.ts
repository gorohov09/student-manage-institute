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
import { GroupDto } from '../dto/group-dto';

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
			{
				path: '/getAllGroups',
				func: this.getAllGroups,
				method: 'get',
			},
			{
				path: '/getStudentsByGroup',
				func: this.getStudentsByGroup,
				method: 'get',
			},
		];
		this.groupService = groupService;
		this.bindRoutes(routes);
	}

	async getStudentsByGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
		const idGroup = req.query.idGroup as string;
		const result = await this.groupService.getStudentsByGroup(idGroup);
		this.ok(res, {
			group: {
				number: result.number,
				specialization: result.specialization,
				students: result.students,
			},
		});
	}

	async getAllGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.groupService.getAllGroup();
		this.ok(res, {
			groups: result?.map(
				(group) =>
					new GroupDto(
						group.id,
						group.number,
						group.specialization,
						group.Creation,
						group.countStudents,
					),
			),
		});
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
