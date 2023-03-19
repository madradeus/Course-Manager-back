import express, { json } from "express";
import 'express-async-errors';
import cors from "cors";
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";
import { coursesRouter } from "./routers/courses.router";
import { studentRouter } from "./routers/student.router";
import { studentCourseRouter } from "./routers/studentCourse.router";
import { statsRouter } from "./routers/stats.router";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000' // dopisać do configu
}));
app.use(json({
    limit: "50kb"
}));
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
}));

app.use('/courses', coursesRouter);
app.use('/students', studentRouter);
app.use('/studentsCourses', studentCourseRouter);
app.use('/stats', statsRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => console.log('listening on http://localhost:3001/'));


