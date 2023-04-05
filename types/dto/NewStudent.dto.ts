import { StudentEntity } from "../student";

export interface NewStudentDto extends Omit<StudentEntity, 'id'> {
    id?: string;
}