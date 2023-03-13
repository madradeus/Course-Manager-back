import { ValidationError } from "../utils/errors";
import { pool } from "../db/db";
import { StudentCourseEntity, CourseOfStudent, ParticipantsOfCourse } from "../types/studentCourseEntity";
import { FieldPacket } from "mysql2";

export class StudentCourseRecord implements StudentCourseEntity{
    id: string;
    studentID: string;
    courseId: string;

    constructor(obj: StudentCourseEntity) {

        if ( this.studentID.length !== 36  || this.courseId.length !== 36 ) {
            throw new ValidationError('Wrong studentID or courseId format')
        }

        this.courseId = obj.courseId;
        this.studentID = obj.studentID;
    }

    static async getCoursesOfStudents(studentId: string): Promise<CourseOfStudent[]| []> {


        const [coursesOfStudents] = await pool.execute("SELECT stc.id, crs.name FROM `studentCourses` as stc LEFT JOIN `courses` AS crs ON crs.id = stc.courseId WHERE stc.studentId = :studentId AND crs.isActive = true", {
            studentId
        }) as [CourseOfStudent[], FieldPacket[]];

        return coursesOfStudents;
    }

    static async getParticipantsOfCourse(courseId: string): Promise<ParticipantsOfCourse[] | []> {

        const [participants] = await pool.execute("SELECT stc.id, stn.firstName, stn.lastName FROM `studentCourses` as stc LEFT JOIN `students` AS stn ON stn.id = stc.studentId WHERE stc.courseId = :courseId", {
            courseId
        }) as [ParticipantsOfCourse[], FieldPacket[]];

        return participants;
    }




}