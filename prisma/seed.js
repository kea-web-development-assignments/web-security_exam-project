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
    await db.users.deleteMany({});
    await db.properties.deleteMany({});
    await db.verificationCodes.deleteMany({});
    await db.forgottenPasswordRequests.deleteMany({});

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
                place: 'A street, A city',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis venenatis nulla. Integer faucibus imperdiet urna non viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae nisi quis mi vehicula bibendum auctor eget ipsum. Donec condimentum, lorem eget finibus imperdiet, neque est ultrices velit, sit amet tincidunt elit felis sit amet magna. Pellentesque hendrerit justo velit, ac imperdiet ante accumsan ut. Proin tempus volutpat dolor, eget dapibus felis gravida nec. Nam posuere diam at quam feugiat, sed luctus tellus sagittis. In placerat tincidunt lacus, eu euismod nibh molestie non. Integer at lectus consequat, malesuada dolor quis, interdum nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce mattis, sem vel aliquet molestie, tellus lectus sagittis nisl, a accumsan metus ante vitae velit. Integer sed est lectus.\n\nVestibulum venenatis vulputate magna sit amet volutpat. Nunc consectetur rhoncus vestibulum. Phasellus vestibulum scelerisque eros, in porttitor nisi tempus porttitor. Integer dapibus sodales metus, non tempor nisl ultrices id. Donec et lorem a felis gravida aliquam vel mattis dolor. Mauris nec nulla in magna facilisis finibus. Duis aliquam risus urna, porttitor pellentesque lectus lobortis a.\n\nProin eu nibh purus. Vivamus id elit at augue aliquam volutpat ut in lorem. Sed condimentum turpis a ante varius, non lacinia turpis consequat. Nunc dapibus mauris velit, sed posuere leo viverra ut. Cras ut aliquam nibh. Praesent dapibus euismod massa, eget condimentum tellus sagittis id. Ut cursus ipsum eget mauris facilisis, nec porttitor dui fringilla. Aliquam fringilla nunc ut neque eleifend, at venenatis erat gravida. Mauris fringilla purus eu nulla placerat dignissim. Donec nisi quam, mollis ut scelerisque eu, pretium nec mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
                lon: '12.5697339',
                lat: '55.6753132',
                pricePerNight: 1258,
                userId: userA.id,
            }
        ]
    });
}
