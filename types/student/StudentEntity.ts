export interface StudentEntity {
    id: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    dateOfBirth: Date;
    emailAddress: string;
}

export interface NewStudentEntity extends Omit<StudentEntity, 'id'> {
    id?: string
}

export type SimpleStudentEntity = Omit<StudentEntity, 'gender' | 'dateOfBirth' | 'emailAddress'>;
