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

    const [ property ] = await db.properties.createManyAndReturn({
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

    await db.comments.createMany({
        data: [
            {
                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, aperiam a dolores dolore necessitatibus praesentium odit reiciendis ex velit voluptates laborum tempore doloribus optio, magnam ducimus sapiente harum rerum, cum alias perspiciatis beatae quaerat qui aliquid? Nesciunt, vitae iste eum veniam quasi facere vero iure nostrum accusantium numquam dolor maiores dolorum amet! Voluptates dolorum officia totam corporis, quibusdam id repellendus numquam ipsum accusamus, saepe repudiandae pariatur. Velit culpa omnis non amet voluptas dolor maiores veritatis atque reprehenderit ut nulla, dolorem esse deserunt, necessitatibus commodi? Ab, corrupti. Magni velit doloremque ab, quam omnis quidem deserunt dolore, dolor vel quisquam aliquid id expedita. Hic labore nobis sit asperiores adipisci nostrum mollitia voluptate a quam culpa voluptas, sint error.",
                userId: userA.id,
                propertyId: property.id,
            },
            {
                description: "Duis eu leo ante. Sed sit amet augue ullamcorper, dignissim nisl eget, luctus elit. Vestibulum consectetur luctus lacus sed ultrices. Vestibulum ipsum metus, vulputate sed turpis sit amet, vulputate blandit turpis. Etiam ut dictum leo, ut sollicitudin enim. Nullam efficitur tellus ac metus porttitor, id gravida orci interdum. Aliquam facilisis suscipit felis. Donec vitae tellus iaculis magna dignissim consectetur. Pellentesque lacus lorem, elementum consequat vestibulum vel, consectetur at odio. Vestibulum at posuere lorem, eu efficitur leo. Donec eget dignissim erat, id ultricies libero. Curabitur suscipit id libero sed pellentesque. Etiam a enim et libero finibus accumsan.",
                userId: userB.id,
                propertyId: property.id,
            },
            {
                description: "Nunc non risus ut elit pulvinar blandit. Vivamus non lacus arcu. Aliquam ultricies tellus eu enim ultrices, sit amet pharetra elit euismod. Nullam vehicula ante tellus, id convallis turpis blandit vitae. Aenean lectus erat, congue at tortor non, tristique posuere elit. Sed id diam nisi. Nulla pellentesque nisl magna, sit amet accumsan sapien ullamcorper a. Proin in dictum mauris, ac vehicula quam. Nunc tincidunt ac mi vel blandit. Curabitur et diam velit. Phasellus a ligula hendrerit sapien malesuada aliquam. Aliquam lacinia convallis est, eu ultrices nunc vestibulum in. Praesent convallis facilisis massa, sit amet tempor mauris convallis sollicitudin. Nullam at varius enim, sit amet lobortis felis. Phasellus condimentum ullamcorper purus, ut efficitur arcu. Suspendisse in egestas quam.",
                userId: userC.id,
                propertyId: property.id,
            },
        ]
    });
}
