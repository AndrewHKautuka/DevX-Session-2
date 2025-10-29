import { getUsersTable } from "./users-table.js";

const contentDiv = document.getElementById("content");

const showUsersButton = document.getElementById("button-show-users");
showUsersButton.addEventListener("click", () => showUsers());

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