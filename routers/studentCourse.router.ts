import { Router } from "express";
import { StudentCourseRecord } from "../records/studentCourse.record";

export const studentCourseRouter = Router();

studentCourseRouter
    .get('/list-courses/:studentId', async (req, res) => {
        const { studentId } = req.params as {
            studentId: string,
        };

        res.json(await StudentCourseRecord.getCoursesOfStudents(studentId));
    })
    .get('/list-students/:courseId', async (req, res) => {
        const { courseId } = req.params as {
            courseId: string,
        };

        res.json(await StudentCourseRecord.getParticipantsOfCourse(courseId))
    })