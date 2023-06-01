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
import { StudentDeleteDto } from '../dto/student-delete-dto';
import { GroupDeleteDto } from '../dto/group-delete-dto';

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
				middlewares: [],
			},
			{
				path: '/getStudentsByGroup',
				func: this.getStudentsByGroup,
				method: 'get',
			},
			{
				path: '/deleteStudent',
				func: this.deleteStudentByGroup,
				method: 'post',
			},
			{
				path: '/deleteGroup',
				func: this.deleteGroup,
				method: 'post',
			},
			{
				path: '/getStatistic',
				func: this.getStatistic,
				method: 'get',
			},
			{
				path: '/getGroupById',
				func: this.getGroupById,
				method: 'get',
			},
			{
				path: '/getStudentById',
				func: this.getStudentById,
				method: 'get',
			},
			{
				path: '/updateStudent',
				func: this.updateStudent,
				method: 'post',
			},
			{
				path: '/updateGroup',
				func: this.updateGroup,
				method: 'post',
			},
		];
		this.groupService = groupService;
		this.bindRoutes(routes);
	}

	async updateGroup(
		{ body, query }: Request<{}, {}, GroupCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const idGroup = query.idGroup as string;
		const result = await this.groupService.updateGroup(idGroup, body);
		this.ok(res, { result: result });
	}

	async updateStudent(
		{ body, query }: Request<{}, {}, StudentCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const idStudent = query.idStudent as string;
		const result = await this.groupService.updateStudent(idStudent, body);
		this.ok(res, { result: result });
	}

	async getStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const idStudent = req.query.idStudent as string;
		const result = await this.groupService.getStudentById(idStudent);
		this.ok(res, {
			student: {
				lastName: result.lastName,
				firstName: result.firstName,
				patronymic: result.patronymic,
				birthday: result.birthday,
			},
		});
	}

	async getGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const idGroup = req.query.idGroup as string;
		const result = await this.groupService.getGroupById(idGroup);
		this.ok(res, {
			group: {
				number: result.number,
				specialization: result.specialization,
			},
		});
	}

	async getStatistic({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.groupService.getCountStudentsAndGroups();
		this.ok(res, {
			statistic: {
				count_groups: result[0],
				count_students: result[1],
			},
			email: user,
		});
	}

	async deleteStudentByGroup(
		{ body }: Request<{}, {}, StudentDeleteDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.groupService.deleteStudentsByGroup(body.groupId, body.studentId);
		this.ok(res, {
			result: result,
		});
	}

	async deleteGroup(
		{ body }: Request<{}, {}, GroupDeleteDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.groupService.deleteGroup(body.groupId);
		this.ok(res, {
			result: result,
		});
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

	async getAllGroups({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.groupService.getAllGroup();
		console.log(user);
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
