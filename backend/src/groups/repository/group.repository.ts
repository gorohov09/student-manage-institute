import { Types } from 'mongoose';
import { Group } from '../group.entity';
import { Student } from '../student.entity';
import { IGroupRepository } from './group.repository.interface';
import { GroupModel, StudentModel } from './group.shema';
import { injectable } from 'inversify';

@injectable()
export class GroupRepository implements IGroupRepository {
	async getGroupById(idGroup: string): Promise<Group> {
		const groupModel = await GroupModel.findById(idGroup);

		const group = new Group(
			groupModel?.number as number,
			groupModel?.specialization as string,
			groupModel?.creation,
		);
		group.id = groupModel?.id;
		return group;
	}

	async getStudentsByGroup(idGroup: string): Promise<Student[]> {
		const groupEntity = await GroupModel.findOne({ _id: idGroup });
		const ids = groupEntity?.students;

		const students = await StudentModel.find();
		const result = students
			.filter((st) => {
				if (ids?.includes(st._id)) {
					return st;
				}
			})
			.map((st) => {
				const res = new Student(st.lastName, st.firstName, st.patronymic, st.birthday);
				res.id = st.id;
				return res;
			});

		return result;
	}

	async getAllGroup(): Promise<Group[]> {
		const groupsModel = await GroupModel.find();
		const groups = groupsModel.map((model) => {
			const group = new Group(model.number, model.specialization, model.creation);
			group.id = model.id;
			group.countStudents = model.students?.length as number;
			return group;
		});

		return groups;
	}

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
