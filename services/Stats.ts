import { pool } from "../db/db";
import { FieldPacket } from "mysql2";
import {
    GetActiveStudentsNumberResponse,
    GetNumberOfActiveCoursesResponse,
    GetTotalAvgFrequencyResponse
} from "../types";


export class Stats {

    static async getNumberOfActiveCourses(): Promise<GetNumberOfActiveCoursesResponse> {

        const [[result]] = await pool.execute("SELECT COUNT(*) as coursesNumber FROM `courses` WHERE isActive = true") as [GetNumberOfActiveCoursesResponse[], FieldPacket[]];

        return result;
    }

    static async getActiveStudentsNumber(): Promise<GetActiveStudentsNumberResponse> {

        const [[result]] = await pool.execute("SELECT COUNT(DISTINCT stc.studentId) as studentsNumber  from `studentCourses` as stc LEFT JOIN `courses` as crs on stc.courseId = crs.id WHERE crs.isActive = true") as [GetActiveStudentsNumberResponse[], FieldPacket[]];

        return result;
    }

    static async getTotalAvgFrequency(): Promise<GetTotalAvgFrequencyResponse> {

       const [[allStudentCourses]] =  await pool.execute("SELECT COUNT(*) as studentsCourses FROM `studentCourses`") as [{ studentsCourses: number }[], FieldPacket[]];

        return {
            avgFrequency: allStudentCourses.studentsCourses / (await Stats.getNumberOfActiveCourses()).coursesNumber,
        }
    }
}