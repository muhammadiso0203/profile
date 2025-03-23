import fs from "node:fs/promises";
import path from "node:path";

export const readUsers = async () => {
	try {
		const filePath = path.join(import.meta.dirname, "..", "db", "user.json");
		const users = await fs.readFile(filePath, "utf-8");
		return JSON.parse(users);
	} catch (error) {
		throw new Error("Failed to read user data.");
	}
};

export const writeUsers = async (users) => {
	try {
		const filePath = path.join(import.meta.dirname, "..", "db", "user.json");
		await fs.writeFile(filePath, JSON.stringify(users, null, 2));
	} catch (error) {
		throw new Error("Failed to write user data.");
	}
};
