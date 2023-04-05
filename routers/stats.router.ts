import { Router } from "express";
import { Stats } from "../services/Stats";

export const statsRouter = Router();

statsRouter
    .get('/active-courses', async (req, res) => {
        res.json(await Stats.getNumberOfActiveCourses());
    })
    .get('/active-students', async (req, res) => {
        res.json(await Stats.getActiveStudentsNumber());
    })
    .get('/avg-frequency', async (req, res) => {
        res.json(await Stats.getTotalAvgFrequency());
    })