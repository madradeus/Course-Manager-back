export interface StudentEntity {
    id: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    dateOfBirth: Date;
    emailAddress: string;
}

export type SimpleStudentEntity = Omit<StudentEntity, 'gender' | 'dateOfBirth' | 'emailAddress'>;
