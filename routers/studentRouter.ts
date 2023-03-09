import { Router } from "express";
import { StudentRecord } from "../records/student.record";

export const studentRouter = Router()


studentRouter
    .get('/', async (req, res) => {

        res.json(await StudentRecord.getAll());
    })
    .get('/:id', async (req, res) => {
        const { id } = req.params;

        res.json(await StudentRecord.getOne(id));
    })
    .post('/', async (req, res) => {
        const newStudent = new StudentRecord(req.body);

        res.json(await newStudent.insert());
    })
