import { Types } from 'mongoose';
import { Group } from '../group.entity';
import { Student } from '../student.entity';

export interface IGroupRepository {
	createGroup: (group: Group) => Promise<boolean>;
	createStudent: (student: Student, idGroup: string) => Promise<boolean>;
	getAllGroup: () => Promise<Group[]>;
	getStudentsByGroup: (idGroup: string) => Promise<Student[]>;
	getGroupById: (idGroup: string) => Promise<Group>;
}
