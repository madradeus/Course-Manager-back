import { CourseRecord } from "../../records/course.record";

jest
    .spyOn(CourseRecord, "getOne")
    .mockImplementation(async (id: string): Promise<CourseRecord | null> => {
        if ( id ==='xyz' ) {
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