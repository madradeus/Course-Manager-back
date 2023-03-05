import { CourseRecord } from "../../records/course.record";
import { v4 as uuid } from "uuid";
import { defaultCourse } from "./course-record.test";
import { SimpleCourseEntity } from "../../types";

let course: CourseRecord;

beforeAll(() => {
    course = new CourseRecord(defaultCourse)
});

jest
    .spyOn(CourseRecord, "getOne")
    .mockImplementation(async (id: string): Promise<CourseRecord | null> => {
        if ( id === 'xyz' ) {
            return null
        } else {
            return new CourseRecord({
                id,
                name: 'Kizomba w Ritmo',
                description: 'Taniec, który swoje korzenie wypuścił z Angoli, a które dotarły aż do Ritmo! Mówi się, że kizomba to najpiękniejszy sposób na przytulenie drugiego człowieka. Jest językiem ciała, pełnym czułości, bliskości. Skupia się na partnerach i emocjach pomiędzy nimi, dzięki czemu będziecie mieli okazję przekazać to, czego nie da się wyrazić choćby tysiącem słów. Podbije Wasze serca swoją prostotą i elegancją, wzmocni pewność siebie i kto wie? Może wciągnie tak samo jak nas? Słowem - petarda!',
                startDate: new Date(),
                isActive: true,
            })
        }
    });

jest
    .spyOn(CourseRecord, 'getAll')
    .mockImplementation(async (): Promise<SimpleCourseEntity[] | []> => {
        return (
            [
                {
                    id: "c3ac6512-1191-4f4a-a9eb-98bb3cc0c80d",
                    name: "Bachata",
                    description: 'opis',
                    isActive: true
                },
                {
                    id: "c3ddec32-aed3-46d8-9995-96b1002ed8c8",
                    name: "Bachata",
                    description: "Bliski kontakt partnerów, zmysłowy ruch bioder, romantyczna muzyka … To wszystko sprawia, że kiedy raz zatańczysz bachatę – nie możesz już przestać tańczyć. Na kursie nauczysz się kroków podstawowych, obrotów a także wielu innych podstawowych elementów tańca w parze tj. contra, slide, wychylenia, techniki prowadzenia partnerki oraz ruch bioder. Jeśli tańczysz salsę i bywasz na latynoskich imprezach, a jeszcze nie umiesz tańczyć bachaty …to najwyższy czas nadrobić tę zaległość!\r\n\r\nNasi instruktorzy bachaty (zawsze jest to para!) – wprowadzą Cię w ten rewelacyjny taniec!\r\nJeśli chcesz brać udział w salsotekach, nauka bachaty będzie najprostszą i najmilszą na nie przepustką. Kurs polecany dla osób, które pragną wynieść z zajęć niezapomniane wrażenia, a także dla tych, które chcą dobrze się bawić w rytmach gorącej muzyki.\r\n\r\nPolecamy ten taniec wszystkim pragnącym nauki prostego, ale bardzo zmysłowego tańca !",
                    isActive: false
                },
            ]
        )
    });

jest
    .spyOn(CourseRecord.prototype, 'insert')
    .mockImplementation(async (): Promise<string> => {
        return uuid()
    });

test('CourseRecord.getOne() returns data from db for existing record', async () => {
    const course = await CourseRecord.getOne('39f5d124-6d7f-4c6b-9f1f-3afe30cae7ae');

    expect(course.id).toEqual('39f5d124-6d7f-4c6b-9f1f-3afe30cae7ae');
    expect(course.name).toEqual('Kizomba w Ritmo');
    expect(course.description).toBeDefined();
    expect(course.startDate instanceof Date).toBeTruthy();
    expect(course.isActive).toEqual(true)
});

test('CourseRecord.getOne() returns null for no existing record', async () => {
    const course = await CourseRecord.getOne('xyz');

    expect(course).toBeNull()
});

test('CourseRecord.insert() returns id in uuid format', async () => {
    expect(await course.insert()).toBeDefined();
    expect(await course.insert()).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
});

test('CourseRecord.getAll returns array of SimpleCourseEntities', async () => {
    const courses = await CourseRecord.getAll();
    expect(courses).toHaveLength(2);
    expect(courses[0].id).toBeDefined();
    expect(courses[0].name).toEqual('Bachata')
    expect(courses[0].description).toBeDefined();
    expect(typeof courses[0].isActive === 'boolean').toBeTruthy()
});