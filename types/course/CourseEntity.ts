export interface CourseEntity {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    isActive: boolean;
}

export type SimpleCourseEntity = Omit<CourseEntity, 'startDate'>