import { sql } from "./constants/db.js";

export async function dispatchRequest(requestPath) {
	switch (requestPath) {
		case "users": {
			const users = await sql`SELECT * FROM users;`;
			return JSON.stringify(users);
		}

		default: {
			throw Error("Unknown api request");
		}
	}
}