import { Router } from "express";
import { CourseRecord } from "../records/course.record";
import { ValidationError } from "../utils/errors";
import { isDate } from "../utils/isDate";

export const coursesRouter = Router();

coursesRouter
    .get('/', async (req, res) => {

        res.json(await CourseRecord.getAll());
    })
    .get('/:id', async (req, res) => {

        res.json(await CourseRecord.getOne(req.params.id));

    })
    .post('/', async (req, res) => {

        if ( !isDate(req.body.startDate) ) {
            throw new ValidationError('Start Date must be a Date type')
        }

        const newCourse = new CourseRecord({
            ...req.body,
            startDate: new Date(req.body.startDate)
        });

        if ( newCourse.startDate.setHours(0,0,0,0) < new Date().setHours(0,0,0,0) ) {
            throw new ValidationError('Start date cannot be in past')
        }
        const courseId = await newCourse.insert();

        res.status(201)
        res.json(courseId)
    })
    .patch('/:id', async (req, res) => {
        const foundCourse = await CourseRecord.getOne(req.params.id);
        await foundCourse.update();

        res.json({
            isChanged: 'ok',
            courseId: foundCourse.id
        })
    })
