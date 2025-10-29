import { sql } from "./constants/db.js";

export async function dispatchRequest(method, requestPath) {
	switch (requestPath) {
		case "users": {
			return dispatchUsersRequest(method)
		}

		default: {
			throw Error("Unknown api request");
		}
	}
}

export async function dispatchUsersRequest(method) {
	switch (method) {
		case "GET": {
			const users = await sql`SELECT * FROM users;`;
			return JSON.stringify(users);
		}

		default: {
			throwInvalidMethodError("/api/users", ["GET"])
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