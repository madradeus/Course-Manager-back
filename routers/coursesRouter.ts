import { Router } from "express";
import { CourseRecord } from "../records/course.record";
import { ValidationError } from "../utils/errors";
import { isDate } from "../utils/isDate";

export const coursesRouter = Router();

coursesRouter
    .get('/', async (req, res) => {
        const { name } = req.query as {
            name: string
        };

        res.json(await CourseRecord.findAll(name ?? ''));
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
        if ( newCourse.startDate < new Date() ) {
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
