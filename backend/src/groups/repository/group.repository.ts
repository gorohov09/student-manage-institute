import { Types } from 'mongoose';
import { Group } from '../group.entity';
import { Student } from '../student.entity';
import { IGroupRepository } from './group.repository.interface';
import { GroupModel, StudentModel } from './group.shema';
import { injectable } from 'inversify';

@injectable()
export class GroupRepository implements IGroupRepository {
	async createGroup(group: Group): Promise<boolean> {
		const groupEntity = new GroupModel({
			number: group.number,
			specialization: group.specialization,
			creation: group.Creation,
		});

		await groupEntity.save();
		return true;
	}

	async createStudent(student: Student, idGroup: string): Promise<boolean> {
		const studentEntity = new StudentModel({
			lastName: student.lastName,
			firstName: student.firstName,
			patronymic: student.patronymic,
			birthday: student.birthday,
		});

		await studentEntity.save();

		const groupEntity = await GroupModel.where({ _id: idGroup }).findOne();
		groupEntity?.students?.push(studentEntity._id);
		await groupEntity?.save();

		return true;
	}
}
