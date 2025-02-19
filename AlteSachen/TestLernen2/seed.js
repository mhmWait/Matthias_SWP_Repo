const { PrismaClient } = require("@prisma/client");
prisma = new PrismaClient();
const { faker } = require("faker");

async function main() {
    for (i = 0; i < 10; i++) {
        const prismaUser = await prisma.user.create({
            data: {
                name: faker.name.fullname(),
            },
        });
    }
    const userIds = (await prisma.user.findMany({ select: { id: true } })).map(
        (_) => _.id
    );
    for (i = 0; i < 50; i++) {
        const prismaEmail = await prisma.email.create({
            data: {
                test: faker.lorem.words(5),
                userId: userIds[
                    faker.number.int({ min: 0, max: userIds.lenght - 1 })
                ],
            },
        });
    }
    const emailIds = (
        await prisma.email.findMany({ select: { id: true } })
    ).map((_) => _.id);

    for (i = 0; i < 50; i++) {
        const prismaPost = await prisma.post.create({
            data: {
                name: faker.lorem.words(5),
            },
        });
    }

    const postIds = (await prisma.post.create({ select: { id: true } })).map(
        (_) => _.id
    );

    for (i = 0; i < 200; i++){
        await prisma.post.update()
    }
}

main();
