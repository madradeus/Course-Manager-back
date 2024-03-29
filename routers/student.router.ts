import { Router } from "express";
import { StudentRecord } from "../records/student.record";
import { isDate } from "../utils/isDate";
import { ValidationError } from "../utils/errors";

export const studentRouter = Router()


studentRouter
    .get('/', async (req, res) => {

        res.json(await StudentRecord.getAll());
    })
    .get('/birthday-students', async (req, res) =>{

        res.json(await StudentRecord.getBirthdayStudents());

    })
    .get('/:id', async (req, res) => {
        const { id } = req.params;

        res.json(await StudentRecord.getOne(id));
    })
    .post('/', async (req, res) => {
        if ( !isDate(req.body.dateOfBirth) ) {
            throw new ValidationError('Start Date must be a Date type')
        }
        const newStudent = new StudentRecord({
            ...req.body,
            dateOfBirth: new Date(req.body.dateOfBirth)
        });

        res.status(201);
        res.json(await newStudent.insert());
    })
    .delete('/:id', async (req, res) => {

        const { id } = req.params;
        const student = await StudentRecord.getOne(id);
        if ( !student ) {
            throw new ValidationError('There is no such student')
        }
        await student.delete();
        res.status(204);
        res.end();
    })

