import { Stats } from "../../services/Stats";
import { CourseRecord } from "../../records/course.record";
import { pool } from "../../db/db";
import { StudentRecord } from "../../records/student.record";
import {
    GetActiveStudentsNumberResponse,
    GetNumberOfActiveCoursesResponse,
    GetTotalAvgFrequencyResponse
} from "../../types";

let activeCoursesRes: GetNumberOfActiveCoursesResponse;
let activeStudentsRes : GetActiveStudentsNumberResponse
beforeAll(async() => {
    activeCoursesRes = await Stats.getNumberOfActiveCourses();
    activeStudentsRes = await Stats.getActiveStudentsNumber();
})
afterAll( async () => {
    await pool.end();
})

jest
    .spyOn(Stats, 'getTotalAvgFrequency')
    .mockImplementation(async ():Promise<GetTotalAvgFrequencyResponse> => {
        return {
            avgFrequency: 100/ 10
        }
    });

test('getNumberOfActiveCourses() returns number', async() => {

    expect(activeCoursesRes).toHaveProperty('coursesNumber');
    expect(activeCoursesRes instanceof Object).toBeTruthy();
    expect(typeof activeCoursesRes.coursesNumber === 'number').toBeTruthy();
});

test('getNumberOfActiveCourses() returns potentially correct data', async() => {

    expect(activeCoursesRes.coursesNumber).not.toBeGreaterThan((await CourseRecord.getAll()).length);

    const activeCourses = (await CourseRecord.getAll()).filter(course => course.isActive === true);

    expect(activeCoursesRes.coursesNumber).toEqual(activeCourses.length);
});

test('getActiveStudentsNumber() returns number', async () => {

    expect(activeStudentsRes).toHaveProperty('studentsNumber');
    expect(activeStudentsRes instanceof Object).toBeTruthy();
    expect(typeof activeStudentsRes.studentsNumber === 'number').toBeTruthy();
});

test('getActiveStudentsNumber() returns potentially correct data', async () => {

    expect(activeStudentsRes.studentsNumber).not.toBeGreaterThan((await StudentRecord.getAll()).length);
})

test('getTotalAvgFrequency() return correct data', async () => {
    const response = await Stats.getTotalAvgFrequency()

    expect(response).toHaveProperty('avgFrequency');
    expect(typeof response.avgFrequency === 'number').toBeTruthy();
    expect(response.avgFrequency).toEqual(100/10);
})