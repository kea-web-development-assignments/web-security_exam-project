import db from '../src/lib/utils/db.js';

seed()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (error) => {
        console.error('Failed to seed database:', error);
        await db.$disconnect();
    });

async function seed() {
    const [ admin, userA, userB, userC ] = await db.users.createManyAndReturn({
        data: [
            {
                username: 'admin',
                firstName: 'admin',
                lastName: 'admin',
                email: 'admin@admin.admin',
                password: 'admin',
                phoneNum: '12345678',
                role: 'admin',
                verified: true,
            },
            {
                username: 'a',
                firstName: 'a',
                lastName: 'a',
                email: 'a@a.a',
                password: 'a',
                phoneNum: '11223344',
                verified: true,
            },
            {
                username: 'b',
                firstName: 'b',
                lastName: 'b',
                email: 'b@b.b',
                password: 'b',
                phoneNum: '44332211',
                verified: true,
            },
            {
                username: 'c',
                firstName: 'c',
                lastName: 'c',
                email: 'c@c.c',
                password: 'c',
                phoneNum: '11224433',
                verified: true,
            },
        ]
    });

    await db.properties.createMany({
        data: [
            {
                name: 'A apartment',
                address: 'A street, A city',
                lon: '12.5697339',
                lat: '55.6753132',
                pricePerNight: 1258,
                userId: userA.id,
            }
        ]
    });
}
