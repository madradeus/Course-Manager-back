import { pool } from "../db/db";
import { FieldPacket } from "mysql2";
import {
    getActiveStudentsNumberResponse,
    getNumberOfActiveCoursesResponse,
    getTotalAvgFrequencyResponse
} from "../types";


export class Stats {

    static async getNumberOfActiveCourses(): Promise<getNumberOfActiveCoursesResponse> {

        const [[result]] = await pool.execute("SELECT COUNT(*) as coursesNumber FROM `courses` WHERE isActive = true") as [getNumberOfActiveCoursesResponse[], FieldPacket[]];

        return result;
    }

    static async getActiveStudentsNumber(): Promise<getActiveStudentsNumberResponse> {

        const [[result]] = await pool.execute("SELECT COUNT(DISTINCT stc.studentId) as studentsNumber  from `studentCourses` as stc LEFT JOIN `courses` as crs on stc.courseId = crs.id WHERE crs.isActive = true") as [getActiveStudentsNumberResponse[], FieldPacket[]];

        return result;
    }

    static async getTotalAvgFrequency(): Promise<getTotalAvgFrequencyResponse> {

       const [[allStudentCourses]] =  await pool.execute("SELECT COUNT(*) as studentsCourses FROM `studentCourses`") as [{ studentsCourses: number }[], FieldPacket[]];

        return {
            avgFrequency: allStudentCourses.studentsCourses / (await Stats.getNumberOfActiveCourses()).coursesNumber,
        }
    }
}