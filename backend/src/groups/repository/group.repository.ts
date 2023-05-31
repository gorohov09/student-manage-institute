import { Date } from 'mongoose';
import { Group } from '../group.entity';
import { Student } from '../student.entity';
import { IGroupRepository } from './group.repository.interface';
import { GroupModel, StudentModel } from './group.shema';
import { injectable } from 'inversify';
import { GroupCreateDto } from '../dto/group-create-dto';
import { StudentCreateDto } from '../dto/student-create-dto';

@injectable()
export class GroupRepository implements IGroupRepository {
	async updateGroup(idGroup: string, group: GroupCreateDto): Promise<boolean> {
		console.log(group);
		const groupModel = await GroupModel.findById(idGroup);

		if (groupModel !== null) {
			groupModel.number = group.number;
			groupModel.specialization = group.specialization;
		}

		groupModel?.save();
		return true;
	}

	async updateStudent(idStudent: string, student: StudentCreateDto): Promise<boolean> {
		const studentModel = await StudentModel.findById(idStudent);

		if (studentModel !== null) {
			studentModel.lastName = student.lastName;
			studentModel.firstName = student.firstName;
			studentModel.patronymic = student.patronymic;
			studentModel.birthday = student.birthday;
		}

		studentModel?.save();
		return true;
	}

	async getStudentById(idStudent: string): Promise<Student> {
		const studentModel = await StudentModel.findById(idStudent);

		const student = new Student(
			studentModel?.lastName as string,
			studentModel?.firstName as string,
			studentModel?.patronymic as string,
			studentModel?.birthday as globalThis.Date,
		);

		student.id = studentModel?.id;
		return student;
	}

	async deleteGroup(idGroup: string): Promise<boolean> {
		console.log(idGroup);
		const res = await GroupModel.findOneAndDelete({ _id: idGroup });
		console.log(res);
		const idStudents = res?.students;

		idStudents?.forEach(async (id) => {
			const student = await StudentModel.findOneAndDelete({ _id: id });
		});

		return true;
	}

	async deleteStudentByGroup(idGroup: string, idStudent: string): Promise<boolean> {
		const res = await StudentModel.findOneAndDelete({ _id: idStudent });

		const groupModel = (await GroupModel.findById(idGroup)) as any;

		const index = groupModel?.students?.indexOf(res?._id, 0);
		if (index > -1) {
			groupModel?.students.splice(index, 1);
		}

		await groupModel?.save();

		return true;
	}

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

	async getAllStudents(): Promise<Student[]> {
		const studentsModel = await StudentModel.find();
		const students = studentsModel.map((model) => {
			const student = new Student(
				model.lastName,
				model.firstName,
				model.patronymic,
				model.birthday,
			);
			student.id = model.id;
			return student;
		});

		return students;
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
