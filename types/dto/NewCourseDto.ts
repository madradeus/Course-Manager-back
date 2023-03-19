import { CourseEntity } from "../course";

export interface NewCourseDto extends Omit<CourseEntity, 'id'> {
    id?: string
}