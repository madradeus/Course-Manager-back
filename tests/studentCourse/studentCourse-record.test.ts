import { StudentCourseRecord } from "../../records/studentCourse.record";
import { defaultStudent } from "../student/student-record.test";
import { defaultCourse } from "../course/course-record.test";


export let defaultStudentCourse: StudentCourseRecord;
let courseId: string;
let studentId: string;

beforeAll(() => {

    courseId = defaultCourse.id;
    studentId = defaultStudent.id;

    defaultStudentCourse = new StudentCourseRecord({
        courseId,
        studentId,
    })
})

test('Can build StudentCourseRecord', () => {

    expect(defaultStudentCourse).toBeDefined();
    expect(defaultStudentCourse.id).toBeUndefined();
    expect(defaultStudentCourse.courseId).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    expect(defaultStudentCourse.studentId).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    expect(defaultStudentCourse.courseId).toEqual(defaultCourse.id);
    expect(defaultStudentCourse.studentId).toEqual(defaultStudent.id);

});

test('Validates invalid courseId', () => {
    expect(() => new StudentCourseRecord({
        ...defaultStudentCourse,
        courseId: 'abc',
    })).toThrow('Wrong studentID or courseId format');
});

test('Validates invalid studentId', () => {
    expect(() => new StudentCourseRecord({
        ...defaultStudentCourse,
        studentId: 'defg',
    })).toThrow('Wrong studentID or courseId format')
});


