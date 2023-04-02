export interface StudentCourseEntity {
    id?: string;
    studentId: string;
    courseId: string;
}

export interface CourseOfStudent {
    id: string;
    courseId: string;
    name: string;
}

export interface ParticipantOfCourse {
    id: string;
    studentId: string;
    firstName: string;
    lastName: string;
}