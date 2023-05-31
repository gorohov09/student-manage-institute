import { inject, injectable } from 'inversify';
import { GroupCreateDto } from '../dto/group-create-dto';
import { StudentCreateDto } from '../dto/student-create-dto';
import { Group } from '../group.entity';
import { Student } from '../student.entity';
import { IGroupService } from './group.service.interface';
import { TYPES } from '../../types';
import { IGroupRepository } from '../repository/group.repository.interface';

@injectable()
export class GroupService implements IGroupService {
	constructor(@inject(TYPES.GroupRepository) private groupRepository: IGroupRepository) {}

	async updateGroup(idGroup: string, group: GroupCreateDto): Promise<boolean> {
		const res = await this.groupRepository.updateGroup(idGroup, group);
		return res;
	}

	async updateStudent(idStudent: string, student: StudentCreateDto): Promise<boolean> {
		const res = await this.groupRepository.updateStudent(idStudent, student);
		return res;
	}

	async getGroupById(idGroup: string): Promise<Group> {
		const group = await this.groupRepository.getGroupById(idGroup);
		return group;
	}

	async getStudentById(idStudent: string): Promise<Student> {
		const student = await this.groupRepository.getStudentById(idStudent);
		return student;
	}

	async getCountStudentsAndGroups(): Promise<number[]> {
		const students = await this.groupRepository.getAllGroup();
		const groups = await this.groupRepository.getAllStudents();

		const countStudents = students.length;
		const countGroups = groups.length;

		const list: number[] = [];

		list.push(countStudents);
		list.push(countGroups);

		return list;
	}

	async deleteGroup(idGroup: string): Promise<boolean> {
		const result = await this.groupRepository.deleteGroup(idGroup);
		return result;
	}

	async deleteStudentsByGroup(idGroup: string, idStudent: string): Promise<boolean> {
		const result = await this.groupRepository.deleteStudentByGroup(idGroup, idStudent);
		return result;
	}

	async getStudentsByGroup(idGroup: string): Promise<Group> {
		const students = await this.groupRepository.getStudentsByGroup(idGroup);
		const group = await this.groupRepository.getGroupById(idGroup);
		group.students = students;
		return group;
	}

	async getAllGroup(): Promise<Group[] | null> {
		const groops = await this.groupRepository.getAllGroup();
		return groops;
	}

	async createGroup(dto: GroupCreateDto): Promise<Group | null> {
		const group = new Group(dto.number, dto.specialization);
		const result = await this.groupRepository.createGroup(group);
		if (result) return group;

		return null;
	}

	async createStudent(dto: StudentCreateDto): Promise<Student | null> {
		const student = new Student(dto.lastName, dto.firstName, dto.patronymic, dto.birthday);
		const result = await this.groupRepository.createStudent(student, dto.groupId);
		if (result) return student;

		return null;
	}
}
