import { getCreateUserForm } from "./create-user-form.js";
import { getUsersTable } from "./users-table.js";

const contentDiv = document.getElementById("content");

const showUsersButton = document.getElementById("button-show-users");
showUsersButton.addEventListener("click", () => showUsers());

const createUserButton = document.getElementById("button-create-user");
createUserButton.addEventListener("click", () => createUser());

async function showUsers() {
	try {
		const response = await fetch("api/users", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		});
		const users = await response.json();

		const userCountLabel = document.createElement("p");
		userCountLabel.className = "table-label"
		userCountLabel.textContent = `There ${users.length === 1 ? "is" : "are"} ${users.length ?? "no"} user${users.length === 1 ? "" : "s"}${users.length === 0 ? "." : ":"}`;

		const usersTable = getUsersTable(users);

		contentDiv.replaceChildren(userCountLabel, usersTable);
	} catch (error) {
		console.log(error);
	}
}

async function createUser() {
	try {
		const label = document.createElement("p");
		label.className = "form-label";

		const postUser = async (userData) => {
			let payload

			if (userData instanceof FormData) {
				payload = {};
				for (const [key, value] of userData.entries()) {
					if (payload[key]) {
						// If key already exists, convert to array or push to existing array
						if (!Array.isArray(payload[key])) {
							payload[key] = [payload[key]];
						}
						payload[key].push(value);
					} else {
						payload[key] = value;
					}
				}
			} else {
				payload = userData
			}

			const response = await fetch("api/users", {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				label.textContent = "Failed to post user";
			} else {
				label.textContent = "Successfully created new user";
			}
		};

		const createUserForm = getCreateUserForm(postUser);
		contentDiv.replaceChildren(createUserForm, label);
	} catch (error) {
		console.log(error);
	}
}