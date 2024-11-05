const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { PrismaClient } = require("@prisma/client");

//wenn Sie sich das anschauen legen sie einen neuen User an und loggen sich ein. dann schließen sie die website und öffnen sie neu. der username
// sollte grün sein, da er in einem cookie gespeichert wurde.
//MFG Matthias und Emil
const prisma = new PrismaClient();
const app = express();
const PORT = 5555;

app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: null,
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("static"));

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        res.status(201).send("User registered successfully!");
    } catch (error) {
        console.error(error);
        if (error.code === "P2002") {
            res.status(400).send("Username already exists");
        } else {
            res.status(500).send("User registration failed");
        }
    }
});

app.post("/login", async (req, res) => {
    const { username, password, rememberMe } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(400).send("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid credentials");
        }

        req.session.username = username;

        if (rememberMe) {
            res.cookie("rememberedUser", username, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: false,
            });
        } else {
            res.clearCookie("rememberedUser");
        }

        res.send("Logged in successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
