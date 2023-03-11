import { StudentRecord } from "../../records/student.record";
import { defaultStudent } from "./student-record.test";
import { pool } from "../../db/db";


let newStudent: StudentRecord
beforeAll(() => {
    newStudent = new StudentRecord({
        firstName: 'Zenon',
        lastName: `${defaultStudent.lastName}[TEST]`,
        gender: 'male',
        dateOfBirth: new Date('2000-01-01'),
        emailAddress: 'a@.b.c'
    });
});
afterAll(async () => {
    await pool.execute("DELETE FROM `students` WHERE `lastName` like '%[TEST]%'");
    await pool.end();
});


test('StudentRecord.insert() returns id',  async () => {
    const insertedId = await newStudent.insert();

    expect(insertedId).toHaveLength(36);
    expect(insertedId).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
});

test('StudentRecord.insert() inserts record to db and StudentRecord.getOne() returns record from db', async () => {
    const newStudent = new StudentRecord({
        ...defaultStudent
    });
    const insertedId = await newStudent.insert();
    const foundStudent = await StudentRecord.getOne(insertedId);

    expect(foundStudent).toBeDefined();
    expect(foundStudent.id).toEqual(newStudent.id);
    expect(foundStudent).toStrictEqual(newStudent);

});

test('StudentsRecord.getOne() returns null for no existing id', async () => {
    const found = await StudentRecord.getOne('xyz');
    expect(found).toBeNull();
});

test('StudentsRecord.getAll() returns array of records', async () => {
    const results = await StudentRecord.getAll();

    expect(results instanceof Array).toBeTruthy();
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0] instanceof StudentRecord).not.toBeTruthy();
});

