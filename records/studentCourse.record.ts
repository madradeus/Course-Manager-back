import { ValidationError } from "../utils/errors";
import { pool } from "../db/db";
import { StudentCourseEntity, CourseOfStudent, ParticipantOfCourse } from "../types";
import { FieldPacket } from "mysql2";
import { v4 as uuid } from "uuid";

export class StudentCourseRecord implements StudentCourseEntity{
    id: string;
    studentId: string;
    courseId: string;

    constructor(obj: StudentCourseEntity) {

        if ( obj.studentId.length !== 36  || obj.courseId.length !== 36 ) {
            throw new ValidationError('Wrong studentID or courseId format')
        }

        this.courseId = obj.courseId;
        this.studentId = obj.studentId;
    }

    static async getCoursesOfStudents(studentId: string): Promise<CourseOfStudent[]| []> {


        const [coursesOfStudents] = await pool.execute("SELECT stc.id, stc.courseId, crs.name FROM `studentCourses` as stc LEFT JOIN `courses` AS crs ON crs.id = stc.courseId WHERE stc.studentId = :studentId AND crs.isActive = true", {
            studentId
        }) as [CourseOfStudent[], FieldPacket[]];

        return coursesOfStudents;
    }

    static async getParticipantsOfCourse(courseId: string): Promise<ParticipantOfCourse[] | []> {

        const [participants] = await pool.execute("SELECT stc.id, stc.studentId, stn.firstName, stn.lastName FROM `studentCourses` as stc LEFT JOIN `students` AS stn ON stn.id = stc.studentId WHERE stc.courseId = :courseId ORDER BY stn.lastName ASC ", {
            courseId
        }) as [ParticipantOfCourse[], FieldPacket[]];

        return participants;
    }

    //@TODO połączyć te 2 metody

    async insert( ): Promise<string> {
        if ( !this.id ) {
            this.id = uuid()
        }
        if ( (await StudentCourseRecord.getCoursesOfStudents(this.studentId)).some((studentCourse:CourseOfStudent) => studentCourse.courseId === this.courseId) ) {
            throw new ValidationError('The Student has been already sign on this course')
        }
        await pool.execute("INSERT INTO `studentCourses` VALUES (:id, :studentId, :courseId)", {
            id: this.id,
            studentId: this.studentId,
            courseId: this.courseId,
        });

        return this.id;
    }

    static async delete(studentCourseID: string): Promise<void> {

        await pool.execute("DELETE FROM `studentCourses` WHERE id = :studentCourseID", {
            studentCourseID
            }
        );
    }
}