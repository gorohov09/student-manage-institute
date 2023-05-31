import { Types } from 'mongoose';
import { Group } from '../group.entity';
import { Student } from '../student.entity';
import { GroupCreateDto } from '../dto/group-create-dto';
import { StudentCreateDto } from '../dto/student-create-dto';

export interface IGroupRepository {
	createGroup: (group: Group) => Promise<boolean>;
	createStudent: (student: Student, idGroup: string) => Promise<boolean>;
	getAllGroup: () => Promise<Group[]>;
	getStudentsByGroup: (idGroup: string) => Promise<Student[]>;
	getAllStudents: () => Promise<Student[]>;
	getGroupById: (idGroup: string) => Promise<Group>;
	getStudentById: (idStudent: string) => Promise<Student>;
	deleteStudentByGroup: (idGroup: string, idStudent: string) => Promise<boolean>;
	deleteGroup: (idGroup: string) => Promise<boolean>;
	updateGroup: (idGroup: string, group: GroupCreateDto) => Promise<boolean>;
	updateStudent: (idStudent: string, student: StudentCreateDto) => Promise<boolean>;
}
