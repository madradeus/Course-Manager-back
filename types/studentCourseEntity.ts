export interface StudentCourseEntity {
    id?: string;
    studentID: string;
    courseId: string;

}

export interface CourseOfStudent {
    id: string;
    name: string;
}

export interface ParticipantsOfCourse {
    id: string;
    firstName: string;
    lastName: string;
}