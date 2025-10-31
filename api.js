import { sql } from "./constants/db.js";

export async function dispatchRequest(method, requestPath, requestBody) {
	switch (true) {
		case requestPath?.startsWith("users"): {
			return dispatchUsersRequest(method, requestBody)
		}

		default: {
			throw Error("Unknown api request");
		}
	}
}

export async function dispatchUsersRequest(method, requestBody) {
	switch (method) {
		case "GET": {
			const users = await sql`SELECT * FROM users;`;
			return JSON.stringify(users);
		}

		case "POST": {
			if (!requestBody) {
				throwInvalidRequestBodyError();
			}
			const user = requestBody;
			await sql`INSERT INTO users (name, dob, username, email) VALUES(${user.name}, ${user.dob}, ${user.username}, ${user.email})`;

			return JSON.stringify({ message: "Successfully added user." });
		}

		default: {
			throwInvalidMethodError("/api/users", ["GET", "POST"])
		}
	}
}

function throwInvalidMethodError(path, validMethods) {
	const methods = validMethods;

	if (methods.length > 1) {
		methods[methods.length - 1] = "and ".concat([methods.length - 1])
	}

	throw Error(`Invalid method on ${path}.\nIt must be one of: ${methods.join(", ")}`);
}

function throwInvalidRequestBodyError() {
	throw Error(`Expected JSON request body but was given null, undefined or was empty`);
}