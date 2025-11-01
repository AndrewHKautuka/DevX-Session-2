import { createCell } from "./table-utils.js";

export function getUserBox(user) {
	const userBox = document.createElement("table");
	userBox.id = "user-box";

	const usernameRow = userBox.insertRow();
	createCell(usernameRow, "Username:");
	createCell(usernameRow, user.username);

	const nameRow = userBox.insertRow();
	createCell(nameRow, "Name:");
	createCell(nameRow, user.name);

	const emailRow = userBox.insertRow();
	createCell(emailRow, "Email:");
	createCell(emailRow, user.email);

	const dobRow = userBox.insertRow();
	createCell(dobRow, "Date of Birth:");
	createCell(dobRow, new Date(user.dob).toLocaleDateString());

	return userBox;
}
