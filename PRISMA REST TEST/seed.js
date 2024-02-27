const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { faker } = require('@faker-js/faker');


class fakeuser {
    constructor() {
        this.username = faker.person.fullName();       
    }
}

class fakeSong {
    constructor() {
        this.title = faker.music.songName();
        this.artist = faker.person.fullName();
        this.genre = faker.music.genre();
    }
}

async function main() {
    for (let i = 0; i < 100; i++) {
        const user = new fakeuser();
        const prismaUser = await prisma.user.create({
            data: user,
                
        });
    }
    const userIds = (await prisma.user.findMany({ select: { id: true } })).map(
        (_) => _.id
    );

    console.log('100 users created');

    for (let i = 0; i < 1000; i++) {
        const song = new fakeSong();
        const prismaSong = await prisma.song.create({
            data: song,
        });
    }
    console.log('10000 songs created');

    const songIds = (
        await prisma.song.findMany({ select: { id: true } })
    ).map((_) => _.id);

    for (uid of userIds) {
        const playSongs = faker.number.int({min: 1, max: 200});
        const songsPlaylist = new Set();

        for (let i = 0; i < playSongs; i++) {
            songsPlaylist.add(
                songIds[faker.number.int({min: 0, max: songIds.length - 1})]
            );
        }
        for (let i of songsPlaylist) {
            const prismaPlaylist = await prisma.playlist.create({
                data: {
                    userId: uid,
                    song: {
                        connect: { id: i },
                    },
                    name: faker.lorem.words(3),
                },
            });
        
        }
        
    }

}
main().then(() => {
    prisma.$disconnect();
    console.log('done');
}); // eslint-disable-line no-console
