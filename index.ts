import express, { json } from "express";
import 'express-async-errors';
import cors from "cors";
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import { coursesRouter } from "./routers/courses.router";
import { studentRouter } from "./routers/student.router";
import { studentCourseRouter } from "./routers/studentCourse.router";
import { statsRouter } from "./routers/stats.router";
import { config } from "./config/config";
import { authRouter } from "./routers/auth.router";
import { authenticate } from "./utils/middlewares/authenticate";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
    credentials: true,

}));
app.use(json({
    limit: "50kb"
}));
app.use(cookieParser());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 200, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
}));
app.use(helmet());
app.use(authenticate);

app.use('/courses', coursesRouter);
app.use('/students', studentRouter);
app.use('/studentsCourses', studentCourseRouter);
app.use('/stats', statsRouter);
app.use('/auth', authRouter)
app.use(handleError);

app.listen(3001, '0.0.0.0', () => console.log('listening on http://localhost:3001/'));


