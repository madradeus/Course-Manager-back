import { NewStudentEntity, SimpleStudentEntity, StudentEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { isEmail } from "../utils/isEmail";
import { v4 as uuid } from "uuid";
import { pool } from "../db/db";
import { FieldPacket } from "mysql2";


type ManyStudentsRecordsResult = [SimpleStudentEntity[], FieldPacket[]];
type SingleStudentRecord = [StudentEntity[], FieldPacket[]];

export class StudentRecord implements StudentEntity {
    id: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    dateOfBirth: Date;
    emailAddress: string;


    constructor(obj: NewStudentEntity | StudentEntity) {

        if ( obj.id ) {
        if ( typeof obj.id !== 'string' || obj.id.length !== 36 ) {
                throw new ValidationError('Wrong format of id')
            }
        }

        if ( !obj.firstName || obj.firstName.length > 15 ) {
            throw new ValidationError('Student first name should be between 1 and 15 characters long');
        }

        if ( !obj.lastName || obj.lastName.length > 35 ) {
            throw new ValidationError('Student last name should be between 1 and 35 characters long');
        }

        if ( !['male', 'female'].some(gender => gender === obj.gender) ) {
            throw new ValidationError('Wrong gender. Gender must equal "male" or "female" ')
        }

        if ( !obj.dateOfBirth ||  !(obj.dateOfBirth instanceof Date) ) {
            throw new ValidationError('Date of birth is obligatory and must be the Date')
        }
        if ( obj.dateOfBirth > new Date(new Date().valueOf() - 18 * 31556952000) ) {
            throw new ValidationError('Student is underage')
        }

        if ( !obj.emailAddress || !isEmail(obj.emailAddress) ) {
            throw new ValidationError('Invalid email Address')
        }


        this.id = obj.id ?? uuid();
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.gender = obj.gender;
        this.dateOfBirth= obj.dateOfBirth;
        this.emailAddress = obj.emailAddress;
    }

    static async getAll(): Promise<SimpleStudentEntity[]> {

        const [results] = await pool.execute("SELECT `id`, `firstName`, `lastName` FROM `students` ORDER BY `lastName` ASC") as ManyStudentsRecordsResult;

        return results;
    }

    static async getOne(id: string): Promise<StudentRecord | null> {
        const [[student]] = await pool.execute("SELECT * FROM `students` WHERE id = :id", {
            id
        }) as SingleStudentRecord;

        return student ? new StudentRecord(student) : null;

    }

    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `students` VALUES (:id, :firstName, :lastName, :gender, :dateOfBirth, :emailAddress)", this);

        return this.id;
    }

}

