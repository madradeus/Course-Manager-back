export interface CourseEntity {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    isActive: boolean;
}

export interface NewCourseEntity extends Omit<CourseEntity, 'id'> {
    id?: string
}

export type SimpleCourseEntity = Omit<CourseEntity, 'startDate'>