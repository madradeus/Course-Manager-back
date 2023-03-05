import { CourseRecord } from "../../records/course.record";


export let defaultCourse: CourseRecord;

beforeAll(() => {
    defaultCourse = new CourseRecord({
        name: 'Kizomba od podstaw',
        description: 'Testowy opis kursu',
        startDate: new Date(),
        isActive: true,
    })
});

test('Can build Course Record', () => {
    console.log(defaultCourse)
    expect(defaultCourse.id).toBeDefined();
    expect(defaultCourse.name).toEqual('Kizomba od podstaw');
    expect( defaultCourse.startDate  instanceof Date).toBeTruthy();
    expect(defaultCourse.isActive).toBeTruthy()
});

test('Validates invalid id', () => {
    expect(() => new CourseRecord({
        ...defaultCourse,
        id: 'abc',
    })).toThrow();

    expect(() => new CourseRecord({
        ...defaultCourse,
        id: undefined,
    })).not.toThrow('Wrong format of id');
});

test('Validates invalid name', () => {
    expect(() => new CourseRecord({
        ...defaultCourse,
        name: undefined,
    })).toThrow('Course name should be between 1 and 100 characters long');

    expect(() => new CourseRecord({
        ...defaultCourse,
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    })).toThrow('Course name should be between 1 and 100 characters long');
});

test('Validates invalid description', () => {
    expect(() => new CourseRecord({
        ...defaultCourse,
        description:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    })).toThrow('Course description cannot be longer then 1000 characters');
});

test('Validates invalid start date', () => {
    expect(() => new CourseRecord({
        ...defaultCourse,
        startDate: undefined,
    })).toThrow('Course start date is obligatory and must be the Date');

    expect(() => new CourseRecord({
        ...defaultCourse,
        startDate: '2023-11-23' as any,
    })).toThrow('Course start date is obligatory and must be the Date');
});

test('Validates invalid activity', () => {
    expect(() => new CourseRecord({
        ...defaultCourse,
        isActive: null,
    })).toThrow('isActive field must be clearly defined');

});
