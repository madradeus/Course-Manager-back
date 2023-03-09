import { StudentRecord } from "../../records/student.record";

export let defaultStudent : StudentRecord;

beforeAll(() => {
    defaultStudent = new StudentRecord({
        firstName: 'Jan',
        lastName: 'Kowalski',
        gender: 'male',
        dateOfBirth: new Date('2000-11-12'),
        emailAddress: 'jan.kowal@a.b'
    })
});

test('Can build StudentRecord', () => {
    expect(defaultStudent.id).toBeDefined();
    expect(defaultStudent.id.length).toEqual(36);
    expect(defaultStudent.firstName).toEqual('Jan');
    expect(defaultStudent.lastName).toEqual('Kowalski');
    expect(defaultStudent.gender).toBe('male');
    expect(defaultStudent.dateOfBirth instanceof Date).toBeTruthy();
    expect(defaultStudent.emailAddress).toBe('jan.kowal@a.b');
})

test('Validates invalid id', () => {
    expect(() => new StudentRecord({
        ...defaultStudent,
        id: 123 as any
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        id: 'ssdass'
    })).toThrow();
});

test('Validates invalid first name', () => {
    expect(() => new StudentRecord({
        ...defaultStudent,
        firstName: '',
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        firstName: 'Bardzo długie imię i nawet zbyt długie',
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        firstName: undefined,
    })).toThrow();
});

test('Validates invalid last name', () =>{
    expect(() => new StudentRecord({
        ...defaultStudent,
        lastName: undefined,
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        lastName: '',
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        lastName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    })).toThrow();
});

test('Validates invalid gender', () => {
    expect(() => new StudentRecord({
        ...defaultStudent,
        gender: 'woman' as any
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        gender: undefined
    })).toThrow();
});

test('Validates invalid date of Birth',() => {
    expect(() => new StudentRecord({
    ...defaultStudent,
    dateOfBirth: '2021-11-11' as any
})).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        dateOfBirth: 'yesterday' as any
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        dateOfBirth: new Date('2015-11-01'),
    })).toThrow();
});

test('Validates invalid email address', () => {
    expect(() => new StudentRecord({
        ...defaultStudent,
        emailAddress: 'something'
    })).toThrow();
    expect(() => new StudentRecord({
        ...defaultStudent,
        emailAddress: 'something@.abc.com'
    })).not.toThrow();
});