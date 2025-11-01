import { sql } from "./constants/db.js";

export async function dispatchRequest(method, requestPath, requestBody) {
	const usersPath = "users";
	switch (true) {
		case requestPath?.startsWith(usersPath): {
			return dispatchUsersRequest(method, requestPath.slice(usersPath.length + 1), requestBody);
		}

		default: {
			throw Error("Unknown api request");
		}
	}
}

export async function dispatchUsersRequest(method, requestSubPath, requestBody) {
	switch (method) {
		case "GET": {
			if (requestSubPath) {
				const username = requestSubPath.split("/")[0];
				const user = (await sql`SELECT * FROM users WHERE username = ${username};`)[0];
				return JSON.stringify(user);
			} else {
				const users = await sql`SELECT * FROM users;`;
				return JSON.stringify(users);
			}
		}

		case "POST": {
			if (!requestBody) {
				throwInvalidRequestBodyError();
			}
			const user = requestBody;
			await sql`INSERT INTO users (name, dob, username, email) VALUES(${user.name}, ${user.dob}, ${user.username}, ${user.email})`;

			return JSON.stringify({ message: "Successfully added user." });
		}

		case "DELETE": {
			if (!requestSubPath) {
				throw new Error("No username supplied for delete operation");
			}

			const username = requestSubPath.split("/")[0];
			await sql`DELETE FROM users WHERE username = ${username};`;
			return JSON.stringify({ message: "Successfully deleted user." });
		}

		default: {
			throwInvalidMethodError("/api/users", ["GET", "POST"])
		}
	}
}

function throwInvalidMethodError(path, validMethods) {
	const methods = validMethods;

	if (methods.length > 1) {
		methods[methods.length - 1] = "and ".concat([methods.length - 1]);
	}

	throw Error(`Invalid method on ${path}.\nIt must be one of: ${methods.join(", ")}`);
}

function throwInvalidRequestBodyError() {
	throw Error(`Expected JSON request body but was given null, undefined or was empty`);
}