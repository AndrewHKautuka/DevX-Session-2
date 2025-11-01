import { getCreateUserForm } from "./create-user-form.js";
import { getUserBox } from "./user-box.js";
import { getUserSearch } from "./user-search.js";
import { getUsersTable } from "./users-table.js";

const contentDiv = document.getElementById("content");

const showUsersButton = document.getElementById("button-show-users");
showUsersButton.addEventListener("click", () => showUsers());

const createUserButton = document.getElementById("button-create-user");
createUserButton.addEventListener("click", () => createUser());

const searchUserButton = document.getElementById("button-search-user");
searchUserButton.addEventListener("click", () => searchUser());

const deleteUserButton = document.getElementById("button-delete-user");
deleteUserButton.addEventListener("click", () => deleteUser());

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

async function searchUser() {
	try {
		const label = document.createElement("p");
		label.className = "form-label";

		const getUser = async (userData) => {
			let username
			console.log("UserData", userData)
			if (userData instanceof FormData) {
				username = userData.get("search");
			} else {
				username = userData.search
			}

			if (!username) {
				label.textContent = "No username supplied";
				return;
			}

			const response = await fetch(`api/users/${username}`, {
				method: "GET",
				headers: {
					Accept: "application/json"
				}
			});

			const content = [userSearch, label]
			try {
				const user = await response.json();
				const userBox = getUserBox(user);
				label.textContent = "Successfully found user";
				content.splice(1, 0, userBox);
			} catch (error) {
				label.textContent = "Failed to find user";
			}
			contentDiv.replaceChildren(...content);
		};

		const userSearch = getUserSearch("Search User:", getUser);
		contentDiv.replaceChildren(userSearch, label);
	} catch (error) {
		console.log(error);
	}
}

async function deleteUser() {
	try {
		const label = document.createElement("p");
		label.className = "form-label";

		const deleteUser = async (userData) => {
			let username
			console.log("UserData", userData)
			if (userData instanceof FormData) {
				username = userData.get("search");
			} else {
				username = userData.search
			}

			if (!username) {
				label.textContent = "No username supplied";
				return;
			}

			await fetch(`api/users/${username}`, {
				method: "DELETE"
			});

			label.textContent = `Deleted user with username ${username}`;
		};

		const userSearch = getUserSearch("Delete User:", deleteUser);
		contentDiv.replaceChildren(userSearch, label);
	} catch (error) {
		console.log(error);
	}
}