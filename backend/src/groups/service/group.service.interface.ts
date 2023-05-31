import { GroupCreateDto } from '../dto/group-create-dto';
import { StudentCreateDto } from '../dto/student-create-dto';
import { Group } from '../group.entity';
import { Student } from '../student.entity';

export interface IGroupService {
	createGroup: (dto: GroupCreateDto) => Promise<Group | null>;
	createStudent: (dto: StudentCreateDto) => Promise<Student | null>;
	getAllGroup: () => Promise<Group[] | null>;
	getStudentsByGroup: (idGroup: string) => Promise<Group>;
	getCountStudentsAndGroups: () => Promise<number[]>;
	getGroupById: (idGroup: string) => Promise<Group>;
	getStudentById: (idStudent: string) => Promise<Student>;
	deleteStudentsByGroup: (idGroup: string, idStudent: string) => Promise<boolean>;
	deleteGroup: (idGroup: string) => Promise<boolean>;
	updateGroup: (idGroup: string, group: GroupCreateDto) => Promise<boolean>;
	updateStudent: (idStudent: string, student: StudentCreateDto) => Promise<boolean>;
}
