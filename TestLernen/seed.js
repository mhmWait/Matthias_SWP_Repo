const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

class fakeuser {
    constructor() {
        this.name = faker.animal.crocodilia();
    }
}

async function main() {
    for (let i = 0; i < 10; i++) {
        user = new fakeuser();
        prismaUser = await prisma.user.create({
            data: user,
        });
    }
    const userIds = (await prisma.user.findMany({ select: { id: true } })).map(
        (_) => _.id
    );

    for (let i = 0; i < 50; i++) {
        prismaPost = await prisma.post.create({
            data: {
                title: faker.lorem.words(1),
                userId: userIds[
                    faker.number.int({ min: 0, max: userIds.length - 1 })
                ],
            },
        });
    }

    const postIds = (await prisma.post.findMany({ select: { id: true } })).map(
        (_) => _.id
    );

    for (let i = 0; i < 50; i++) {
        prismaEmail = await prisma.email.create({
            data: {
                text: faker.lorem.words(5),
            },
        });
    }

    const emailIds = (
        await prisma.email.findMany({ select: { id: true } })
    ).map((_) => _.id);

    for (let i = 0; i < emailIds.length * 4; i++) {
        await prisma.user.update({
            where: {
                id: userIds[
                    faker.number.int({ min: 0, max: userIds.length - 1 })
                ],
            },
            data: {
                emails: {
                    connect: {
                        id: emailIds[
                            faker.number.int({
                                min: 0,
                                max: emailIds.length - 1,
                            })
                        ],
                    },
                },
            },
        });
    }
}

main()
    .then(() => {
        prisma.$disconnect();
        console.log("done");
    })
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    });
