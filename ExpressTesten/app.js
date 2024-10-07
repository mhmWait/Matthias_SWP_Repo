const express = require("express");
const app = express();
const port = 3000;
const prisma = require("./lib/db");
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", express.static("static"));

app.get("/", async (req, res) => {
    res.render("index", { zoos: await prisma.zoo.findMany() });
});

app.get("/zoo/:id", async (req, res) => {
    res.render("abteilungen", {
        abteilungen: await prisma.abteilungen.findMany({
            select: { id: res.params.id },
        }),
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
