const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/User', async (req, res) => {
    const { username } = req.body;
    const user = await prisma.user.create({
        data: {
            username,
        },
    });
    res.json(user);
});

app.get('/users', async (req, res) => {
    const user = await prisma.user.findMany();
    res.json(user);
});

app.get('/movies', async (req, res) => {
    const songs = await prisma.song.findMany();
    res.json(songs);
});

app.get('/playlists', async (req, res) => {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
});

const server = app.listen(3000, () =>
    console.log(`Server ready at: http://localhost:3000`)
);