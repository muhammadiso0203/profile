import express from "express";
import { v4 } from "uuid";
import path from "node:path";

// import { User } from "./entities/index.js";
// import { readUsers, writeUsers } from "./libs/index.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userList = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "jhon123",
    }
];

//custom middleware
app.use((req, res, next) => {
	const start = Date.now();
	next();
	const end = Date.now();
	console.log(`Request took ${end - start}ms`);
});

app.get("/", (req, res) => {
	const homePageFilePath = path.join(import.meta.dirname,"public","index.html",);
	res.sendFile(homePageFilePath);
});

app.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw new Error("Please provide email and password");
        }
        const user = userList.find((user) => user.email === email);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.password !== password) {
            throw new Error("Invalid password");
        }

        res.cookie("user", user.id);
        res.send(`
           <h1>LOgin successful</h1>
           <p>Welcome back, ${useer.name}<p> 
            `)
    } catch (error) {
        next(error);
    }
});

app.get("/create", (req, res) => {
	const homePageFilePath = path.join(
		import.meta.dirname,
		"public",
		"create.html",
	);
	res.sendFile(homePageFilePath);
});

app.post("/create", async (req, res, next) => {
	try {
		const body = req.body;
		if (!body.name || !body.email || !body.password) {
            throw new Error("Please provide all required fields");
        }
        
        const user = userList.find((user) => user.email === body.email);

        if (user) {
            throw new Error("User already exists");
        }
		body.id = v4();
		userList.push(body);

        res.send(`
            <h1>Registration Successful</h1>
            <p>Thank you for registering with us ${body.name}</p>

            <a href="/login">Login</a>
            `);
	} catch (error) {
		next(error);
	}
});

app.get("/login", (req, res) => {
	const homePageFilePath = path.join(
		import.meta.dirname,
		"public",
		"login.html",
	);
	res.sendFile(homePageFilePath);
});

app.get("/users", (req, res, next) => {
	try {
		res.json(userList);
	} catch (error) {
		next(error);
	}
});

// error handling middleware
app.use((error, req, res, next) => {
	res.status(500).send(error.message);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});