import { pool } from "../db/db";
import { FieldPacket } from "mysql2";

export class Stats {

    static async getNumberOfActiveCourses(): Promise<number> {

        const [[result]] = await pool.execute("SELECT COUNT(*) as coursesNumber FROM `courses` WHERE isActive = true") as [{ coursesNumber: number }[], FieldPacket[]];

        return result.coursesNumber;
    }

    static async getActiveStudentsNumber(): Promise<number> {

        const [[result]] = await pool.execute("SELECT COUNT(DISTINCT stc.studentId) as studentsNumber  from `studentCourses` as stc LEFT JOIN `courses` as crs on stc.courseId = crs.id WHERE crs.isActive = true") as [{ studentsNumber: number }[], FieldPacket[]];

        return result.studentsNumber;
    }

    static async getTotalAvgFrequency(): Promise<number> {

       const [[allStudentCourses]] =  await pool.execute("SELECT COUNT(*) as studentsCourses FROM `studentCourses`") as [{ studentsCourses: number }[], FieldPacket[]];

        return allStudentCourses.studentsCourses / await Stats.getNumberOfActiveCourses();
    }
}