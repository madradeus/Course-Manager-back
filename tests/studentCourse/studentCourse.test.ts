import { pool } from "../../db/db";
import { StudentCourseRecord } from "../../records/studentCourse.record";
import { CourseRecord } from "../../records/course.record";
import { StudentRecord } from "../../records/student.record";

let insertedId: string;
let exampleCourseId: string;
let exampleStudentId: string;
let myStudentCourseRecord: StudentCourseRecord;

beforeAll(async () => {
    exampleCourseId = (await CourseRecord.getAll())[0].id;
    exampleStudentId = (await StudentRecord.getAll())[0].id;

    myStudentCourseRecord = new StudentCourseRecord({
        courseId: exampleCourseId,
        studentId: exampleStudentId
    });
});

afterAll(async () => {
        console.log(insertedId)
        await pool.execute("DELETE FROM `studentCourses` WHERE id = :id", {
            id: insertedId
        })
        await pool.end();
    }
)

test('insert() returns id as uuid', async () => {

    insertedId = await myStudentCourseRecord.insert();

    expect(insertedId).toBeDefined();
    expect(insertedId).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
})

test('Second try to insert the same record should Throw', async () => {
    const nextStudentCourseRecord = new StudentCourseRecord({
        courseId: myStudentCourseRecord.courseId,
        studentId: myStudentCourseRecord.studentId,
    })

    await expect(nextStudentCourseRecord.insert()).rejects.toThrow();
})

test('getCoursesOfStudents() returns list of courses', async () => {
    const coursesOfStudent = await StudentCourseRecord.getCoursesOfStudents(exampleStudentId);

    expect(coursesOfStudent).toBeDefined()
    expect(coursesOfStudent.length).toBeGreaterThanOrEqual(1)
    expect(coursesOfStudent[0]).toHaveProperty('id');
    expect(coursesOfStudent[0]).toHaveProperty('courseId');
    expect(coursesOfStudent[0]).toHaveProperty('name');
})

test('getParticipantsOfCourse() returns list of participants', async () => {
    const participantsList = await StudentCourseRecord.getParticipantsOfCourse(exampleCourseId);

    expect(participantsList).toBeDefined()
    expect(participantsList.length).toBeGreaterThanOrEqual(1)
    expect(participantsList[0]).toHaveProperty('id');
    expect(participantsList[0]).toHaveProperty('studentId');
    expect(participantsList[0]).toHaveProperty('firstName');
    expect(participantsList[0]).toHaveProperty('lastName');
})