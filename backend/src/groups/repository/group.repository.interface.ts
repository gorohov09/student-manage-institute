import { Types } from 'mongoose';
import { Group } from '../group.entity';
import { Student } from '../student.entity';

export interface IGroupRepository {
	createGroup: (group: Group) => Promise<boolean>;
	createStudent: (student: Student, idGroup: string) => Promise<boolean>;
}
