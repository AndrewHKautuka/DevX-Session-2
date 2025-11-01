import { createCell, createTHead } from "./table-utils.js";

export function getUsersTable(users) {
	const usersTable = document.createElement("table");
	usersTable.id = "users-table";

	createTHead(usersTable, ["No.", "Username", "Name", "Email", "Date of Birth"])

	users.forEach((user, index) => {
		const row = usersTable.insertRow();

		createCell(row, index + 1);
		createCell(row, user.username);
		createCell(row, user.name);
		createCell(row, user.email);
		createCell(row, new Date(user.dob).toLocaleDateString());
	});

	return usersTable;
}