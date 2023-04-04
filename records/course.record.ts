import { CourseEntity, CourseUpdateResponse, NewCourseDto, SimpleCourseEntity } from "../types";
import { v4 as uuid } from "uuid";
import { ValidationError } from "../utils/errors";
import { pool } from "../db/db";
import { FieldPacket } from "mysql2";


type ManyCoursesRecordsResult = [CourseRecord[], FieldPacket[]];
type CourseRecordResult = [CourseRecord[], FieldPacket[]];

export class CourseRecord implements CourseEntity {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    isActive: boolean;


    constructor(obj: NewCourseDto | CourseEntity) {

        if ( obj.id ) {
            if ( obj.id.length !== 36 ) {
                throw new ValidationError('Wrong format of id')
            }
        }

        if ( !obj.name || obj.name.length > 100 ) {
            throw new ValidationError('Course name should be between 1 and 100 characters long')
        }

        if ( obj.description && obj.description.length > 1000 ) {
            throw new ValidationError('Course description cannot be longer then 1000 characters')
        }

        if ( !obj.startDate ||  !(obj.startDate instanceof Date) ) {
            throw new ValidationError('Course start date is obligatory and must be the Date')
        }

        if (  obj.isActive  === null ) {
            throw new ValidationError('isActive field must be clearly defined')
        }

        this.id = obj.id ?? uuid();
        this.name = obj.name;
        this.description = obj.description;
        this.startDate = obj.startDate;
        this.isActive = Boolean(Number(obj.isActive));
    }

    static async getAll(): Promise<SimpleCourseEntity []> {
        const [foundCourses] = await pool.execute("SELECT `id`, `name`, `description`, `isActive` from `courses` ORDER BY `name` ASC") as ManyCoursesRecordsResult
        return foundCourses.map(course => ({
            ...course,
            isActive: !!Number(course.isActive)
        }));

    }

    static async getOne(id: string): Promise<CourseRecord | null> {
        const [[course]]= await pool.execute("SELECT * FROM `courses` WHERE id = :id", {
            id
        }) as CourseRecordResult;

        return course ? new CourseRecord(course) : null;
}

    async insert(): Promise<string> {
        await pool.execute('INSERT INTO `courses` VALUES (:id, :name, :description, :startDate, :isActive)', {
            id: this.id,
            name: this.name,
            description: this.description,
            startDate: this.startDate,
            isActive: this.isActive,
        });

        return this.id
    }

    async update(): Promise<CourseUpdateResponse> {
        await pool.execute(' UPDATE `courses` SET isActive = :isActive WHERE id = :id', {
            id: this.id,
            isActive: !Number(this.isActive)
        });
        return {
            courseId: this.id,
            isChanged: 'ok'
        }
    }



}

