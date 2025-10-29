export function getUsersTable(users) {
	const usersTable = document.createElement("table");

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

function createTHead(table, headers) {
	const thead = table.createTHead();
	const headerRow = thead.insertRow();

	headers.forEach(content => {
		headerRow
		const th = document.createElement("th");
		th.textContent = content;
		headerRow.appendChild(th);
	});
}

function createCell(row, content) {
	const cell = row.insertCell();
	cell.textContent = content;
}